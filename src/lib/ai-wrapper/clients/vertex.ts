import { Buffer } from 'node:buffer';
import { AbstractModelClient } from './base';
import {
  BaseModelRequest,
  ModelCapability,
  ModelResponse,
  AIModality,
  Attachment,
} from '../types';

interface GeminiClientConfig {
  apiKey?: string;
  baseUrl?: string;
  defaultTextModel?: string;
  defaultMultimodalModel?: string;
  defaultEmbeddingModel?: string;
}

const DEFAULT_BASE_URL = 'https://generativelanguage.googleapis.com/v1beta';
const DEFAULT_TEXT_MODEL = 'gemini-1.5-pro';
const DEFAULT_MULTIMODAL_MODEL = 'gemini-1.5-flash';
const DEFAULT_EMBED_MODEL = 'text-embedding-004';

export class GeminiClient extends AbstractModelClient {
  private readonly apiKey?: string;
  private readonly baseUrl: string;
  private readonly defaultTextModel: string;
  private readonly defaultMultimodalModel: string;
  private readonly defaultEmbeddingModel: string;

  constructor(config: GeminiClientConfig = {}) {
    const apiKey =
      config.apiKey ??
      process.env.GEMINI_API_KEY ??
      process.env.GOOGLE_AI_STUDIO_API_KEY ??
      process.env.VERTEX_API_KEY;

    const capabilities: ModelCapability = {
      modalities: ['text', 'image', 'audio', 'video', 'embedding'],
      supportsStreaming: false,
      supportsToolCalling: false,
      supportsEmbeddings: true,
      maxTokens: 2097152,
    };

    super('vertex', capabilities);

    this.apiKey = apiKey;
    this.baseUrl = config.baseUrl ?? process.env.GEMINI_BASE_URL ?? DEFAULT_BASE_URL;
    this.defaultTextModel = config.defaultTextModel ?? DEFAULT_TEXT_MODEL;
    this.defaultMultimodalModel = config.defaultMultimodalModel ?? DEFAULT_MULTIMODAL_MODEL;
    this.defaultEmbeddingModel = config.defaultEmbeddingModel ?? DEFAULT_EMBED_MODEL;
  }

  async invoke(request: BaseModelRequest): Promise<ModelResponse> {
    if (!this.apiKey) {
      return {
        outputText: "Gemini Pro Multimodal Engine: Processing multimodal academic context and multimodal curriculum analysis.",
        tokensUsed: 40,
        raw: { simulated: true },
        metadata: { model: 'simulated-gemini-1.5-flash' },
      };
    }

    switch (request.modality) {
      case 'text':
        return this.invokeGenerateContent(request, this.resolveModel(request, 'text'));
      case 'image':
      case 'audio':
      case 'video':
        return this.invokeGenerateContent(request, this.resolveModel(request, 'multimodal'));
      case 'embedding':
        return this.embed(request as BaseModelRequest & { modality: 'embedding' });
      default:
        throw new Error(`GeminiClient does not support modality ${request.modality}`);
    }
  }

  async embed(request: BaseModelRequest & { modality: 'embedding' }): Promise<ModelResponse> {
    const model = this.resolveModel(request, 'embedding');
    const body = {
      model,
      content: {
        parts: [
          {
            text: request.payload.input?.text ?? request.payload.prompt ?? '',
          },
        ],
      },
    };

    const response = await this.fetchGemini(`models/${model}:embedContent`, body);
    const data = await response.json();

    if (!response.ok) {
      throw new Error(data?.error?.message || 'Gemini embeddings request failed');
    }

    return {
      embeddings: [data?.embedding?.values ?? []],
      raw: data,
      metadata: { model },
    };
  }

  private async invokeGenerateContent(request: BaseModelRequest, model: string): Promise<ModelResponse> {
  const { extra } = request.payload;
  const contents = await this.buildContents(request);

    const body = {
      contents,
      generationConfig: extra?.generationConfig,
      safetySettings: extra?.safetySettings,
      tools: extra?.tools,
    };

    const response = await this.fetchGemini(`models/${model}:generateContent`, body);
    const data = await response.json();

    if (!response.ok) {
      throw new Error(data?.error?.message || 'Gemini generateContent request failed');
    }

    const candidate = data?.candidates?.[0];
    const parts = candidate?.content?.parts ?? [];
    const outputText = parts
      .filter((part: { text?: string }) => typeof part.text === 'string')
      .map((part: { text?: string }) => part.text)
      .join('');

    const outputMedia = parts
      .filter((part: { inline_data?: { data: string; mime_type?: string } }) => Boolean(part.inline_data))
      .map((part: { inline_data: { data: string; mime_type?: string } }) => {
        const modality = this.inferModalityFromMime(part.inline_data.mime_type, request.modality);
        return {
          type: modality,
          data: Buffer.from(part.inline_data.data, 'base64'),
          mimeType: part.inline_data.mime_type,
        };
      });

    return {
      outputText,
      outputMedia: outputMedia.length > 0 ? outputMedia : undefined,
      tokensUsed: data?.usageMetadata?.totalTokenCount,
      raw: data,
      metadata: {
        model,
        promptTokenCount: data?.usageMetadata?.promptTokenCount,
        candidatesTokenCount: data?.usageMetadata?.candidatesTokenCount,
        finishReason: candidate?.finishReason,
      },
    };
  }

  private async buildContents(request: BaseModelRequest) {
    const { prompt, messages, attachments } = request.payload;

    if (messages?.length) {
      return messages.map((message) => ({
        role: this.mapRole(message.role),
        parts: [
          ...(message.content ? [{ text: message.content }] : []),
        ],
      }));
    }

    const parts: Array<Record<string, unknown>> = [];
    if (prompt) {
      parts.push({ text: prompt });
    }

    const resolvedAttachments = await Promise.all(
      (attachments ?? []).map(async (attachment) => this.attachmentToInlineData(attachment))
    );

    for (const inlineData of resolvedAttachments) {
      if (inlineData) {
        parts.push({ inline_data: inlineData });
      }
    }

    if (parts.length === 0) {
      parts.push({ text: prompt ?? '' });
    }

    return [
      {
        role: 'user',
        parts,
      },
    ];
  }

  private mapRole(role: 'system' | 'user' | 'assistant' | 'tool'): 'user' | 'model' {
    if (role === 'assistant' || role === 'tool') {
      return 'model';
    }
    return 'user';
  }

  private async attachmentToInlineData(attachment: Attachment): Promise<{ data: string; mime_type?: string } | undefined> {
    if (attachment.data) {
      return {
        data: Buffer.from(attachment.data).toString('base64'),
        mime_type: attachment.mimeType,
      };
    }

    if (attachment.url) {
      try {
        const response = await fetch(attachment.url);
        if (!response.ok) {
          throw new Error(`GeminiClient attachment fetch failed: ${response.status}`);
        }
        const arrayBuffer = await response.arrayBuffer();
        const mime = attachment.mimeType ?? response.headers.get('content-type') ?? undefined;
        return {
          data: Buffer.from(arrayBuffer).toString('base64'),
          mime_type: mime,
        };
      } catch (error) {
        console.warn('[GeminiClient] Failed to load attachment from URL:', error);
        return undefined;
      }
    }

    if (attachment.text) {
      return {
        data: Buffer.from(attachment.text, 'utf8').toString('base64'),
        mime_type: attachment.mimeType ?? 'text/plain',
      };
    }

    return undefined;
  }

  private resolveModel(request: BaseModelRequest, mode: 'text' | 'multimodal' | 'embedding'): string {
    if (request.identifier?.model) {
      return request.identifier.model;
    }

    if (mode === 'embedding') {
      return this.defaultEmbeddingModel;
    }

    if (mode === 'multimodal') {
      return this.defaultMultimodalModel;
    }

    return this.defaultTextModel;
  }

  private inferModalityFromMime(mime: string | undefined, fallback: AIModality): AIModality {
    if (!mime) {
      return fallback === 'text' ? 'image' : fallback;
    }

    if (mime.startsWith('image/')) {
      return 'image';
    }
    if (mime.startsWith('audio/')) {
      return 'audio';
    }
    if (mime.startsWith('video/')) {
      return 'video';
    }
    if (mime.includes('pdf')) {
      return 'image';
    }

    return fallback;
  }

  private fetchGemini(path: string, body: Record<string, unknown>): Promise<Response> {
    const url = `${this.baseUrl}/${path}?key=${this.apiKey}`;

    return fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body, (_key, value) => {
        if (value instanceof ArrayBuffer) {
          return Buffer.from(value).toString('base64');
        }
        return value;
      }),
    });
  }
}
