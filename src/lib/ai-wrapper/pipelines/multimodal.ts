import {
  Pipeline,
  PipelineContext,
  PipelineExecutionResult,
  PipelineStepResult,
  BaseModelRequest,
  ModelResponse,
  AiWrapperResponse,
  AIModality,
  Attachment,
} from '../types';

interface InvokeModelFn {
  (request: BaseModelRequest): Promise<ModelResponse>;
}

export class MultiModalPipeline implements Pipeline {
  readonly id = 'multimodal-unified';
  readonly label = 'Multi-modal Pipeline';
  readonly supportedModalities: AIModality[] = ['image', 'audio', 'video'];

  supports(context: PipelineContext['request']): boolean {
    return this.supportedModalities.includes(context.modality);
  }

  async run(context: PipelineContext): Promise<PipelineExecutionResult> {
    const steps: PipelineStepResult[] = [];
    const invokeModel = context.shared.invokeModel as InvokeModelFn;

    const attachments = Array.isArray(context.request.input.attachments)
      ? (context.request.input.attachments as Attachment[])
      : undefined;

    const provider = context.request.modelHint?.provider ?? 'openai';
    const model = context.request.modelHint?.model ?? this.resolveDefaultModel(context.request.modality, provider);

    const modelRequest: BaseModelRequest = {
      id: context.request.id,
      task: context.request.task,
      modality: context.request.modality,
      identifier: {
        provider,
        model,
      },
      payload: {
        prompt: context.request.input.prompt as string | undefined,
        attachments,
        extra: context.request.input.extra as Record<string, unknown> | undefined,
      },
      userId: context.userId,
      traceId: context.traceId,
      options: context.request.options,
    };

    const invokeStart = Date.now();
    const modelResponse = await invokeModel(modelRequest);
    steps.push({
      stage: 'invoke',
      durationMs: Date.now() - invokeStart,
      data: modelResponse,
    });

    const final: AiWrapperResponse = {
      success: true,
      modality: context.request.modality,
      output: {
        media: modelResponse.outputMedia,
        text: modelResponse.outputText,
      },
      tokensUsed: modelResponse.tokensUsed,
      latencyMs: steps.reduce((sum, step) => sum + step.durationMs, 0),
      diagnostics: {
        provider: modelRequest.identifier.provider,
        model: modelRequest.identifier.model,
      },
    };

    steps.push({
      stage: 'deliver',
      durationMs: 0,
      data: final,
    });

    return { final, steps };
  }

  private resolveDefaultModel(modality: AIModality, provider: string): string {
    if (provider === 'vertex') {
      switch (modality) {
        case 'image':
        case 'video':
          return 'gemini-1.5-flash';
        case 'audio':
          return 'gemini-1.5-pro';
        default:
          return 'gemini-1.5-pro';
      }
    }

    if (provider === 'anthropic') {
      switch (modality) {
        case 'image':
          return 'claude-3-opus-20240229';
        default:
          return 'claude-3-5-sonnet-20241022';
      }
    }

    switch (modality) {
      case 'image':
        return 'gpt-image-1';
      case 'audio':
        return 'gpt-4o-mini-tts';
      case 'video':
        return 'gpt-4.1-mini';
      default:
        return 'gpt-4o-mini';
    }
  }
}
