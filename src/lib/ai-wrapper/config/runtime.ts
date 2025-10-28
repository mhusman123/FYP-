import { AIProviderKey, ModelIdentifier } from '../types';

interface ProviderConfig {
  provider: AIProviderKey;
  defaultModel: string;
  apiKey?: string;
  baseUrl?: string;
}

const DEFAULTS: Record<AIProviderKey, ProviderConfig> = {
  openai: {
    provider: 'openai',
    defaultModel: process.env.AI_WRAPPER_DEFAULT_OPENAI_MODEL ?? 'gpt-4o-mini',
    apiKey: process.env.OPENAI_API_KEY,
    baseUrl: process.env.OPENAI_BASE_URL,
  },
  anthropic: {
    provider: 'anthropic',
    defaultModel: process.env.AI_WRAPPER_DEFAULT_ANTHROPIC_MODEL ?? 'claude-3-5-sonnet-20241022',
    apiKey: process.env.ANTHROPIC_API_KEY,
    baseUrl: process.env.ANTHROPIC_BASE_URL,
  },
  openrouter: {
    provider: 'openrouter',
    defaultModel: process.env.AI_WRAPPER_DEFAULT_OPENROUTER_MODEL ?? 'meta-llama/llama-3.1-405b-instruct',
    apiKey: process.env.OPENROUTER_API_KEY,
    baseUrl: process.env.OPENROUTER_BASE_URL,
  },
  vertex: {
    provider: 'vertex',
    defaultModel: process.env.AI_WRAPPER_DEFAULT_VERTEX_MODEL ?? 'gemini-1.5-pro',
    apiKey:
      process.env.GEMINI_API_KEY ??
      process.env.GOOGLE_AI_STUDIO_API_KEY ??
      process.env.VERTEX_API_KEY,
    baseUrl: process.env.GEMINI_BASE_URL ?? 'https://generativelanguage.googleapis.com/v1beta',
  },
  local: {
    provider: 'local',
    defaultModel: process.env.AI_WRAPPER_DEFAULT_LOCAL_MODEL ?? 'ollama:llama3.1',
    apiKey: undefined,
    baseUrl: process.env.LOCAL_LLM_BASE_URL,
  },
};

export function resolveModelIdentifier(partial: Partial<ModelIdentifier> | undefined): ModelIdentifier {
  const provider = partial?.provider ?? 'openai';
  const config = DEFAULTS[provider];
  return {
    provider,
    model: partial?.model ?? config.defaultModel,
    variant: partial?.variant,
  };
}

export function getProviderConfig(provider: AIProviderKey): ProviderConfig {
  return DEFAULTS[provider];
}
