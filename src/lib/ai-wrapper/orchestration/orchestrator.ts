import {
  AiAgent,
  AgentContext,
  AgentResult,
  AgentWorkflow,
  OrchestratorToolkit,
  PipelineStepResult,
  BaseModelRequest,
  ModelResponse,
} from '../types';

export type OrchestratorEvent = {
  event: string;
  payload: Record<string, unknown>;
  timestamp: number;
};

type EventListener = (event: OrchestratorEvent) => void;

type ModelInvoker = (request: BaseModelRequest) => Promise<ModelResponse>;

type StepRecorder = (step: PipelineStepResult) => void;

const WORKFLOW_STAGES = new Set<PipelineStepResult['stage']>([
  'ingest',
  'plan',
  'invoke',
  'validate',
  'enrich',
  'deliver',
]);

export class AgentOrchestrator {
  private readonly agents = new Map<string, AiAgent>();
  private readonly workflows = new Map<string, AgentWorkflow>();
  private readonly listeners = new Set<EventListener>();
  private readonly invokeModel: ModelInvoker;
  private readonly recordStep: StepRecorder;

  constructor(invokeModel: ModelInvoker, recordStep: StepRecorder) {
    this.invokeModel = invokeModel;
    this.recordStep = recordStep;
  }

  registerAgent(agent: AiAgent): void {
    this.agents.set(agent.id, agent);
  }

  registerWorkflow(workflow: AgentWorkflow): void {
    this.workflows.set(workflow.id, workflow);
  }

  getWorkflow(id: string): AgentWorkflow | undefined {
    return this.workflows.get(id);
  }

  onEvent(listener: EventListener): () => void {
    this.listeners.add(listener);
    return () => {
      this.listeners.delete(listener);
    };
  }

  async run(workflowId: string, baseContext: Omit<AgentContext, 'role'>): Promise<AgentResult[]> {
    const workflow = this.workflows.get(workflowId);
    if (!workflow) {
      throw new Error(`Workflow ${workflowId} not registered`);
    }

    const shared = { ...baseContext.shared };
    const results: AgentResult[] = [];

    for (const stage of workflow.stages) {
      const agent = this.agents.get(stage.agentId);
      if (!agent) {
        if (stage.required) {
          throw new Error(`Required agent ${stage.agentId} missing`);
        }
        continue;
      }

      const context: AgentContext = {
        ...baseContext,
        role: stage.role,
        shared,
      };

      const toolkit: OrchestratorToolkit = {
        invokeModel: this.invokeModel,
        emit: (event: string, payload: Record<string, unknown>) => {
          this.emit({ event, payload, timestamp: Date.now() });
        },
        registerStep: (step: PipelineStepResult) => {
          this.recordStep(step);
        },
      };

      const start = Date.now();
      const result = await agent.execute(context, toolkit);
      const durationMs = Date.now() - start;

      this.recordStep({
        stage: this.resolveStage(stage.guardrail, stage.role),
        durationMs,
        data: result,
      });

      results.push(result);

      Object.assign(shared, result.output ?? {});

      if (!result.success && stage.required) {
        throw new Error(`Agent ${stage.agentId} failed and stage marked as required.`);
      }
    }

    return results;
  }

  private emit(event: OrchestratorEvent): void {
    for (const listener of this.listeners) {
      listener(event);
    }
  }

  private resolveStage(guardrail: string | undefined, role: AgentContext['role']): PipelineStepResult['stage'] {
    if (guardrail && this.isWorkflowStage(guardrail)) {
      return guardrail;
    }

    switch (role) {
      case 'planner':
        return 'plan';
      case 'executor':
        return 'invoke';
      case 'verifier':
        return 'validate';
      case 'tool':
        return 'enrich';
      default:
        return 'invoke';
    }
  }

  private isWorkflowStage(value: string): value is PipelineStepResult['stage'] {
    return WORKFLOW_STAGES.has(value as PipelineStepResult['stage']);
  }
}
