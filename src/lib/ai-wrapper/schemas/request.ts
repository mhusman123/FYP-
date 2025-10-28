import { z } from 'zod';

export const baseRequestSchema = z.object({
  id: z.string().uuid().optional(),
  task: z.string(),
  modality: z.enum(['text', 'image', 'audio', 'video', 'embedding']),
  input: z.record(z.string(), z.unknown()),
  modelHint: z
    .object({
      provider: z.enum(['openai', 'anthropic', 'openrouter', 'vertex', 'local']).optional(),
      model: z.string().optional(),
      variant: z.string().optional(),
    })
    .optional(),
  userId: z.string().optional(),
  locale: z.string().optional(),
  options: z
    .object({
      streaming: z.boolean().optional(),
      evaluation: z.boolean().optional(),
      guardrails: z.boolean().optional(),
      responseFormat: z.enum(['text', 'json', 'rich']).optional(),
    })
    .optional(),
  metadata: z.record(z.string(), z.unknown()).optional(),
});

export type BaseAiWrapperRequest = z.infer<typeof baseRequestSchema>;
