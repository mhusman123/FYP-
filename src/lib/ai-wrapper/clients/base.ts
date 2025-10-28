import { BaseModelClient, BaseModelRequest, ModelCapability, ModelResponse, AIModality } from '../types';

export abstract class AbstractModelClient implements BaseModelClient {
  readonly id: string;
  readonly capabilities: ModelCapability;

  protected constructor(id: string, capabilities: ModelCapability) {
    this.id = id;
    this.capabilities = capabilities;
  }

  canHandle(modality: AIModality): boolean {
    return this.capabilities.modalities.includes(modality);
  }

  abstract invoke(request: BaseModelRequest): Promise<ModelResponse>;

  async embed(request: BaseModelRequest & { modality: 'embedding' }): Promise<ModelResponse> {
    throw new Error(`${this.id} does not implement embeddings for ${request.identifier.model}`);
  }

  async transcribe(request: BaseModelRequest & { modality: 'audio' }): Promise<ModelResponse> {
    throw new Error(`${this.id} does not implement transcription for ${request.identifier.model}`);
  }

  async close(): Promise<void> {
    return Promise.resolve();
  }
}
