import { NextRequest } from 'next/server';

export type AIModality = 'text' | 'image' | 'audio' | 'video' | 'embedding';
export type AIProviderKey = 'openai' | 'anthropic' | 'openrouter' | 'vertex' | 'local';
export type AIWorkflowStage = 'ingest' | 'plan' | 'invoke' | 'validate' | 'enrich' | 'deliver';

export interface ModelIdentifier {
  provider: AIProviderKey;
  model: string;
  variant?: string;
}

export interface ModelCapability {
  modalities: AIModality[];
  supportsStreaming?: boolean;
  supportsToolCalling?: boolean;
  supportsEmbeddings?: boolean;
  maxTokens?: number;
  contextWindow?: number;
}

export interface Attachment {
  id: string;
  url?: string;
  mimeType?: string;
  data?: ArrayBuffer;
  text?: string;
}

export interface ModelInvokePayload {
  prompt?: string;
  messages?: Array<{ role: 'system' | 'user' | 'assistant' | 'tool'; content: string }>;
  attachments?: Attachment[];
  input?: Record<string, unknown>;
  temperature?: number;
  topP?: number;
  extra?: Record<string, unknown>;
}

export interface ModelResponse {
  outputText?: string;
  outputMedia?: Array<{ type: AIModality; url?: string; data?: ArrayBuffer; mimeType?: string }>;
  toolCalls?: Array<{ name: string; arguments: Record<string, unknown> }>;
  embeddings?: number[][];
  tokensUsed?: number;
  raw?: unknown;
  metadata?: Record<string, unknown>;
}

export interface BaseModelRequest {
  id: string;
  task: string;
  modality: AIModality;
  identifier: ModelIdentifier;
  payload: ModelInvokePayload;
  userId?: string;
  traceId?: string;
  tags?: string[];
  options?: AiWrapperRequest['options'];
}

export interface BaseModelClient {
  readonly id: string;
  readonly capabilities: ModelCapability;
  canHandle(modality: AIModality): boolean;
  invoke(request: BaseModelRequest): Promise<ModelResponse>;
  embed?(request: BaseModelRequest & { modality: 'embedding' }): Promise<ModelResponse>;
  transcribe?(request: BaseModelRequest & { modality: 'audio' }): Promise<ModelResponse>;
  close?(): Promise<void>;
}

export interface PipelineContext {
  request: AiWrapperRequest;
  httpRequest?: NextRequest;
  userId?: string;
  traceId?: string;
  environment: 'development' | 'staging' | 'production';
  securityContext: SecurityContext;
  plugins: PluginRegistrySnapshot;
  shared: Record<string, unknown>;
}

export interface PipelineStepResult {
  stage: AIWorkflowStage;
  durationMs: number;
  data: unknown;
}

export interface PipelineExecutionResult {
  final: AiWrapperResponse;
  steps: PipelineStepResult[];
}

export interface Pipeline {
  id: string;
  label: string;
  supportedModalities: AIModality[];
  supports(request: AiWrapperRequest): boolean;
  run(context: PipelineContext): Promise<PipelineExecutionResult>;
}

export interface AiWrapperRequest {
  id: string;
  task: string;
  modality: AIModality;
  input: Record<string, unknown>;
  modelHint?: Partial<ModelIdentifier>;
  userId?: string;
  locale?: string;
  options?: {
    streaming?: boolean;
    evaluation?: boolean;
    guardrails?: boolean;
    responseFormat?: 'text' | 'json' | 'rich';
  };
  metadata?: Record<string, unknown>;
}

export interface AiWrapperResponse {
  success: boolean;
  modality: AIModality;
  output: Record<string, unknown>;
  tokensUsed?: number;
  latencyMs?: number;
  warnings?: string[];
  diagnostics?: Record<string, unknown>;
}

export interface AgentContext {
  id: string;
  role: 'planner' | 'executor' | 'verifier' | 'tool';
  modality: AIModality;
  instructions: string;
  input: Record<string, unknown>;
  shared: Record<string, unknown>;
}

export interface AgentResult {
  agentId: string;
  success: boolean;
  output: Record<string, unknown>;
  diagnostics?: Record<string, unknown>;
}

export interface AiAgent {
  id: string;
  label: string;
  modality: AIModality;
  execute(context: AgentContext, toolkit: OrchestratorToolkit): Promise<AgentResult>;
}

export interface OrchestratorToolkit {
  invokeModel(request: BaseModelRequest): Promise<ModelResponse>;
  emit(event: string, payload: Record<string, unknown>): void;
  registerStep(step: PipelineStepResult): void;
}

export interface AgentWorkflow {
  id: string;
  label: string;
  description: string;
  stages: Array<{
    role: AgentContext['role'];
    agentId: string;
    required?: boolean;
    guardrail?: string;
  }>;
}

export interface PluginContext {
  request: AiWrapperRequest;
  pipeline: PipelineContext;
}

export interface PluginHooks {
  onRegister?(): Promise<void> | void;
  beforeGuardrails?(context: PluginContext): Promise<void> | void;
  beforeInvoke?(context: PluginContext): Promise<void> | void;
  afterInvoke?(context: PluginContext & { response: ModelResponse }): Promise<void> | void;
  transformOutput?(context: PluginContext & { response: AiWrapperResponse }): Promise<AiWrapperResponse> | AiWrapperResponse;
}

export interface AiWrapperPlugin extends PluginHooks {
  id: string;
  label: string;
  version: string;
  provides?: Array<'tool' | 'data' | 'telemetry'>;
}

export interface PluginRegistrySnapshot {
  list(): AiWrapperPlugin[];
  get(id: string): AiWrapperPlugin | undefined;
}

export interface SecurityFinding {
  id: string;
  type: 'prompt-injection' | 'pii' | 'malware' | 'toxicity' | 'other';
  severity: 'low' | 'medium' | 'high' | 'critical';
  detail: string;
  mitigation?: string;
}

export interface SecurityContext {
  findings: SecurityFinding[];
  blocked: boolean;
  append(finding: SecurityFinding): void;
}

export interface EvaluationSample {
  id: string;
  label: string;
  expected: Record<string, unknown>;
  actual?: Record<string, unknown>;
  metadata?: Record<string, unknown>;
}

export interface EvaluationMetricResult {
  metric: string;
  score: number;
  detail?: Record<string, unknown>;
}

export interface EvaluationRunResult {
  request: AiWrapperRequest;
  samples: EvaluationSample[];
  metrics: EvaluationMetricResult[];
  startedAt: Date;
  completedAt: Date;
}
