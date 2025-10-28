import { NextRequest } from 'next/server';
import { OpenAIClient } from './clients/openai';
import { AnthropicClient } from './clients/anthropic';
import { GeminiClient } from './clients/vertex';
import { PluginRegistry } from './plugins/registry';
import { TextPipeline } from './pipelines/text';
import { MultiModalPipeline } from './pipelines/multimodal';
import { AgentOrchestrator } from './orchestration/orchestrator';
import { EvaluationRunner, ExactMatchMetric, LatencyBudgetMetric } from './eval';
import {
  AiWrapperRequest,
  AiWrapperResponse,
  BaseModelClient,
  Pipeline,
  PipelineContext,
  PipelineStepResult,
  ModelResponse,
  BaseModelRequest,
  AiWrapperPlugin,
  AgentWorkflow,
  AgentResult,
  EvaluationRunResult,
  AIModality,
  SecurityContext,
} from './types';
import { resolveModelIdentifier } from './config';
import { DefaultSecurityContext } from './security';

interface ExecuteOptions {
  httpRequest?: NextRequest;
  plugins?: AiWrapperPlugin[];
  environment?: 'development' | 'staging' | 'production';
  runEvaluation?: boolean;
  evaluationSamples?: Parameters<EvaluationRunner['run']>[1];
}

interface ExecuteResult {
  response: AiWrapperResponse;
  steps: PipelineStepResult[];
  agents?: AgentResult[];
  evaluation?: EvaluationRunResult;
}

export class AiWrapperCore {
  private readonly clients = new Map<string, BaseModelClient>();
  private readonly pipelines = new Map<string, Pipeline>();
  private readonly pluginRegistry = new PluginRegistry();
  private readonly evaluationRunner = new EvaluationRunner([
    new ExactMatchMetric(),
    new LatencyBudgetMetric(Number(process.env.AI_WRAPPER_LATENCY_BUDGET ?? 2000)),
  ]);
  private readonly orchestrator: AgentOrchestrator;
  private readonly environment: 'development' | 'staging' | 'production';

  constructor(environment: 'development' | 'staging' | 'production' = process.env.NODE_ENV === 'production' ? 'production' : 'development') {
    this.environment = environment;

    this.orchestrator = new AgentOrchestrator(
      (request) => this.invokeModel(request),
      (step) => {
        this.pipelineSteps.push(step);
      }
    );

    this.bootstrapDefaults();
  }

  private pipelineSteps: PipelineStepResult[] = [];

  registerClient(client: BaseModelClient): void {
    this.clients.set(client.id, client);
  }

  registerPipeline(pipeline: Pipeline): void {
    this.pipelines.set(pipeline.id, pipeline);
  }

  registerPlugin(plugin: AiWrapperPlugin): void {
    this.pluginRegistry.register(plugin);
  }

  registerWorkflow(workflow: AgentWorkflow): void {
    this.orchestrator.registerWorkflow(workflow);
  }

  registerAgent(agent: Parameters<AgentOrchestrator['registerAgent']>[0]): void {
    this.orchestrator.registerAgent(agent);
  }

  async execute(request: AiWrapperRequest, options: ExecuteOptions = {}): Promise<ExecuteResult> {
    this.pipelineSteps = [];
    const securityContext: SecurityContext = new DefaultSecurityContext();

    const pipeline = this.resolvePipeline(request.modality);
    if (!pipeline) {
      throw new Error(`No pipeline registered for modality ${request.modality}`);
    }

    options.plugins?.forEach((plugin) => {
      if (!this.pluginRegistry.get(plugin.id)) {
        this.registerPlugin(plugin);
      }
    });

    const context: PipelineContext = {
      request,
      httpRequest: options.httpRequest,
      userId: request.userId,
      traceId: request.metadata?.traceId as string | undefined,
      environment: options.environment ?? this.environment,
      securityContext,
      plugins: this.pluginRegistry.snapshot(),
      shared: {
        invokeModel: (modelRequest: BaseModelRequest) => this.invokeModel(modelRequest),
        orchestrator: this.orchestrator,
      },
    };

    const pipelineResult = await pipeline.run(context);

    let evaluation: EvaluationRunResult | undefined;
    if (options.runEvaluation && options.evaluationSamples?.length) {
      evaluation = await this.evaluationRunner.run(request, options.evaluationSamples);
    }

    return {
      response: pipelineResult.final,
      steps: pipelineResult.steps,
      agents: undefined,
      evaluation,
    };
  }

  getClient(provider: string): BaseModelClient | undefined {
    return this.clients.get(provider);
  }

  getPipeline(id: string): Pipeline | undefined {
    return this.pipelines.get(id);
  }

  private async invokeModel(request: BaseModelRequest): Promise<ModelResponse> {
    const identifier = resolveModelIdentifier(request.identifier);
    const client = this.clients.get(identifier.provider);
    if (!client) {
      throw new Error(`No client registered for provider ${identifier.provider}`);
    }

    request.identifier = identifier;

    return client.invoke(request);
  }

  private resolvePipeline(modality: AIModality): Pipeline | undefined {
    for (const pipeline of this.pipelines.values()) {
      if (pipeline.supports({
        id: 'probe',
        task: 'probe',
        modality,
        input: {},
      } as AiWrapperRequest)) {
        return pipeline;
      }
    }
    return undefined;
  }

  private bootstrapDefaults(): void {
    try {
      this.registerClient(new OpenAIClient());
    } catch (error) {
      console.warn('OpenAI client unavailable', error);
    }

    try {
      this.registerClient(new AnthropicClient());
    } catch (error) {
      console.warn('Anthropic client unavailable', error);
    }

    try {
      this.registerClient(new GeminiClient());
    } catch (error) {
      console.warn('Gemini client unavailable', error);
    }

    this.registerPipeline(new TextPipeline());
    this.registerPipeline(new MultiModalPipeline());
  }
}

export const aiWrapperCore = new AiWrapperCore();
