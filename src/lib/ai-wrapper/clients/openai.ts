import { AbstractModelClient } from './base';
import {
  BaseModelRequest,
  ModelResponse,
  ModelCapability,
  AIModality,
} from '../types';

interface OpenAIClientConfig {
  apiKey?: string;
  organization?: string;
  project?: string;
  baseUrl?: string;
  defaultTextModel?: string;
  defaultEmbeddingModel?: string;
}

const DEFAULT_BASE_URL = 'https://api.openai.com/v1';
const DEFAULT_TEXT_MODEL = 'gpt-4o-mini';
const DEFAULT_EMBED_MODEL = 'text-embedding-3-large';

export class OpenAIClient extends AbstractModelClient {
  private readonly apiKey: string;
  private readonly baseUrl: string;
  private readonly organization?: string;
  private readonly project?: string;
  private readonly defaultTextModel: string;
  private readonly defaultEmbeddingModel: string;

  constructor(config: OpenAIClientConfig = {}) {
    const apiKey = config.apiKey ?? process.env.OPENAI_API_KEY;
    if (!apiKey) {
      throw new Error('OpenAIClient requires OPENAI_API_KEY');
    }

    const capabilities: ModelCapability = {
      modalities: ['text', 'image', 'embedding'],
      supportsStreaming: true,
      supportsToolCalling: true,
      supportsEmbeddings: true,
      maxTokens: 128000,
    };

    super('openai', capabilities);

    this.apiKey = apiKey;
    this.baseUrl = config.baseUrl ?? DEFAULT_BASE_URL;
    this.organization = config.organization ?? process.env.OPENAI_ORG_ID;
    this.project = config.project ?? process.env.OPENAI_PROJECT_ID;
    this.defaultTextModel = config.defaultTextModel ?? DEFAULT_TEXT_MODEL;
    this.defaultEmbeddingModel = config.defaultEmbeddingModel ?? DEFAULT_EMBED_MODEL;
  }

  async invoke(request: BaseModelRequest): Promise<ModelResponse> {
    const modality = request.modality;
    if (!this.canHandle(modality)) {
      throw new Error(`OpenAIClient cannot handle modality ${modality}`);
    }

    switch (modality) {
      case 'text':
        return this.invokeChat(request);
      case 'image':
        return this.invokeImage(request);
      case 'embedding':
        return this.embed(request as BaseModelRequest & { modality: 'embedding' });
      default:
        throw new Error(`OpenAIClient invoke not implemented for modality ${modality}`);
    }
  }

  async embed(request: BaseModelRequest & { modality: 'embedding' }): Promise<ModelResponse> {
    const body = {
      input: request.payload.input?.text ?? request.payload.prompt ?? '',
      model: request.identifier.model || this.defaultEmbeddingModel,
    };

    const response = await this.fetchOpenAI('embeddings', body);
    const data = await response.json();
    if (!response.ok) {
      throw new Error(data?.error?.message || 'OpenAI embeddings request failed');
    }

    return {
      embeddings: data.data?.map((item: { embedding: number[] }) => item.embedding) ?? [],
      tokensUsed: data.usage?.total_tokens,
      raw: data,
      metadata: { model: data.model },
    };
  }

  private async invokeChat(request: BaseModelRequest): Promise<ModelResponse> {
    const messages = request.payload.messages ?? [
      { role: 'system', content: request.payload.prompt ?? 'You are a helpful assistant.' },
      { role: 'user', content: request.payload.prompt ?? '' },
    ];

    const body = {
      model: request.identifier.model || this.defaultTextModel,
      messages,
      temperature: request.payload.temperature ?? 0.2,
      top_p: request.payload.topP ?? 1,
      stream: false,
      response_format: request.options?.responseFormat === 'json' ? { type: 'json_object' } : undefined,
      tools: request.payload.extra?.tools,
    };

    const endpoint = 'chat/completions';
    const response = await this.fetchOpenAI(endpoint, body);
    const data = await response.json();
    if (!response.ok) {
      throw new Error(data?.error?.message || 'OpenAI chat request failed');
    }

    const choice = data.choices?.[0];

    return {
      outputText: choice?.message?.content ?? '',
      toolCalls: choice?.message?.tool_calls ?? [],
      tokensUsed: data.usage?.total_tokens,
      raw: data,
      metadata: {
        model: data.model,
        promptTokens: data.usage?.prompt_tokens,
        completionTokens: data.usage?.completion_tokens,
      },
    };
  }

  private async invokeImage(request: BaseModelRequest): Promise<ModelResponse> {
    const body = {
      model: request.identifier.model || 'gpt-image-1',
      prompt: request.payload.prompt,
      size: request.payload.extra?.size ?? '1024x1024',
    };

    const response = await this.fetchOpenAI('images/generations', body);
    const data = await response.json();
    if (!response.ok) {
      throw new Error(data?.error?.message || 'OpenAI image request failed');
    }

    return {
      outputMedia: data.data?.map((item: { url: string }) => ({
        type: 'image' as AIModality,
        url: item.url,
      })) ?? [],
      raw: data,
      metadata: { model: data.model },
    };
  }

  private fetchOpenAI(path: string, body: Record<string, unknown>): Promise<Response> {
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${this.apiKey}`,
    };

    if (this.organization) {
      headers['OpenAI-Organization'] = this.organization;
    }
    if (this.project) {
      headers['OpenAI-Project'] = this.project;
    }

    return fetch(`${this.baseUrl}/${path}`, {
      method: 'POST',
      headers,
      body: JSON.stringify(body),
    });
  }
}
