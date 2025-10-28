import { Buffer } from 'node:buffer';
import { AbstractModelClient } from './base';
import { BaseModelRequest, ModelCapability, ModelResponse } from '../types';

interface AnthropicClientConfig {
  apiKey?: string;
  baseUrl?: string;
  defaultModel?: string;
}

const DEFAULT_BASE_URL = 'https://api.anthropic.com/v1';
const DEFAULT_MODEL = 'claude-3-5-sonnet-20241022';

export class AnthropicClient extends AbstractModelClient {
  private readonly apiKey: string;
  private readonly baseUrl: string;
  private readonly defaultModel: string;

  constructor(config: AnthropicClientConfig = {}) {
    const apiKey = config.apiKey ?? process.env.ANTHROPIC_API_KEY;
    if (!apiKey) {
      throw new Error('AnthropicClient requires ANTHROPIC_API_KEY');
    }

    const capabilities: ModelCapability = {
      modalities: ['text', 'image'],
      supportsStreaming: true,
      supportsToolCalling: true,
      maxTokens: 200000,
    };

    super('anthropic', capabilities);

    this.apiKey = apiKey;
    this.baseUrl = config.baseUrl ?? DEFAULT_BASE_URL;
    this.defaultModel = config.defaultModel ?? DEFAULT_MODEL;
  }

  async invoke(request: BaseModelRequest): Promise<ModelResponse> {
    if (!this.canHandle(request.modality)) {
      throw new Error(`AnthropicClient cannot handle modality ${request.modality}`);
    }

    if (request.modality === 'text') {
      return this.invokeMessages(request);
    }

    if (request.modality === 'image') {
      return this.invokeVision(request);
    }

    throw new Error(`AnthropicClient invoke not implemented for ${request.modality}`);
  }

  private async invokeMessages(request: BaseModelRequest): Promise<ModelResponse> {
    const body = {
      model: request.identifier.model || this.defaultModel,
      max_tokens: request.payload.extra?.maxTokens ?? 2048,
      temperature: request.payload.temperature ?? 0.6,
      messages: request.payload.messages ?? [
        { role: 'user', content: request.payload.prompt ?? '' },
      ],
      system: request.payload.extra?.systemPrompt,
      tools: request.payload.extra?.tools,
    };

    const response = await this.fetchAnthropic('messages', body, {
      'anthropic-version': '2023-06-01',
    });
    const data = await response.json();
    if (!response.ok) {
      throw new Error(data?.error?.message || 'Anthropic request failed');
    }

    const content = Array.isArray(data.content) ? data.content : [];
    const textBlock = content.find((item: { type: string }) => item.type === 'text');

    return {
      outputText: textBlock?.text ?? '',
      toolCalls: data?.stop_reason === 'tool_use' ? data.content?.filter((item: { type: string }) => item.type === 'tool_use').map((item: { name: string; input: unknown }) => ({
        name: item.name,
        arguments: item.input as Record<string, unknown>,
      })) : [],
      tokensUsed: data?.usage?.input_tokens + data?.usage?.output_tokens,
      raw: data,
      metadata: {
        stopReason: data.stop_reason,
      },
    };
  }

  private async invokeVision(request: BaseModelRequest): Promise<ModelResponse> {
    const body = {
      model: request.identifier.model || this.defaultModel,
      max_tokens: request.payload.extra?.maxTokens ?? 1024,
      messages: request.payload.messages ?? [
        {
          role: 'user',
          content: [
            {
              type: 'image',
              source: {
                type: 'base64',
                media_type: request.payload.attachments?.[0]?.mimeType ?? 'image/png',
                data: request.payload.attachments?.[0]?.data
                  ? Buffer.from(request.payload.attachments[0].data).toString('base64')
                  : request.payload.attachments?.[0]?.data,
              },
            },
            {
              type: 'text',
              text: request.payload.prompt ?? '',
            },
          ],
        },
      ],
    };

    const response = await this.fetchAnthropic('messages', body, {
      'anthropic-version': '2023-06-01',
    });
    const data = await response.json();
    if (!response.ok) {
      throw new Error(data?.error?.message || 'Anthropic vision request failed');
    }

    const content = Array.isArray(data.content) ? data.content : [];
    const textBlock = content.find((item: { type: string }) => item.type === 'text');

    return {
      outputText: textBlock?.text ?? '',
      raw: data,
      metadata: {
        stopReason: data.stop_reason,
      },
    };
  }

  private fetchAnthropic(path: string, body: Record<string, unknown>, extraHeaders?: Record<string, string>): Promise<Response> {
    return fetch(`${this.baseUrl}/${path}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': this.apiKey,
        ...(extraHeaders ?? {}),
      },
      body: JSON.stringify(body),
    });
  }
}
