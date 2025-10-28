import {
  Pipeline,
  PipelineContext,
  PipelineExecutionResult,
  PipelineStepResult,
  BaseModelRequest,
  ModelResponse,
  AiWrapperResponse,
  AIModality,
} from '../types';
import { runGuardrails } from '../security';

interface InvokeModelFn {
  (request: BaseModelRequest): Promise<ModelResponse>;
}

export class TextPipeline implements Pipeline {
  readonly id = 'text-primary';
  readonly label = 'Text Completion Pipeline';
  readonly supportedModalities: AIModality[] = ['text'];

  supports(context: PipelineContext['request']): boolean {
  return this.supportedModalities.includes(context.modality);
  }

  async run(context: PipelineContext): Promise<PipelineExecutionResult> {
    const steps: PipelineStepResult[] = [];
    const invokeModel = context.shared.invokeModel as InvokeModelFn;
    const startedAt = Date.now();

    const inputText = String(context.request.input.prompt ?? context.request.input.text ?? '');

    const guardrailStart = Date.now();
    if (context.request.options?.guardrails !== false) {
      const guardrails = runGuardrails(inputText, {
        blockOnInjection: true,
        blockOnSensitiveData: true,
      });
      steps.push({
        stage: 'ingest',
        durationMs: Date.now() - guardrailStart,
        data: guardrails,
      });
      guardrails.findings.forEach((finding) => context.securityContext.append(finding));
      if (guardrails.blocked) {
        return {
          final: {
            success: false,
            modality: 'text',
            output: {
              message: 'Request blocked by guardrails.',
              findings: guardrails.findings,
            },
          },
          steps,
        };
      }
    }

    const provider = context.request.modelHint?.provider ?? 'openai';
    const model = context.request.modelHint?.model ?? this.resolveDefaultModel(provider);

    const modelRequest: BaseModelRequest = {
      id: context.request.id,
      task: context.request.task,
      modality: 'text',
      identifier: {
        provider,
        model,
      },
      payload: {
        prompt: inputText,
        messages: context.request.input.messages as BaseModelRequest['payload']['messages'],
        temperature: context.request.input.temperature as number | undefined,
        topP: context.request.input.topP as number | undefined,
        extra: context.request.input.extra as Record<string, unknown> | undefined,
      },
      userId: context.userId,
      traceId: context.traceId,
      tags: Array.isArray(context.request.metadata?.tags)
        ? (context.request.metadata?.tags as string[])
        : undefined,
      options: context.request.options,
    };

    const invokeStart = Date.now();
    const modelResponse = await invokeModel(modelRequest);
    steps.push({
      stage: 'invoke',
      durationMs: Date.now() - invokeStart,
      data: modelResponse,
    });

    const deliverStart = Date.now();
    const final: AiWrapperResponse = {
      success: true,
      modality: 'text',
      output: {
        text: modelResponse.outputText,
        toolCalls: modelResponse.toolCalls,
      },
      tokensUsed: modelResponse.tokensUsed,
      latencyMs: Date.now() - startedAt,
      diagnostics: {
        provider: modelRequest.identifier.provider,
        model: modelRequest.identifier.model,
      },
    };

    steps.push({
      stage: 'deliver',
      durationMs: Date.now() - deliverStart,
      data: final,
    });

    return { final, steps };
  }

  private resolveDefaultModel(provider: string): string {
    switch (provider) {
      case 'anthropic':
        return 'claude-3-5-sonnet-20241022';
      case 'vertex':
        return 'gemini-1.5-pro';
      case 'openrouter':
        return 'meta-llama/llama-3.1-405b-instruct';
      case 'local':
        return 'ollama:llama3.1';
      default:
        return 'gpt-4o-mini';
    }
  }
}
