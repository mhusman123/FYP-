/**
 * AI Mentor Chat API Endpoint
 * Provides bilingual (English + Urdu) study assistance via the AiWrapperCore
 */

import { randomUUID } from 'node:crypto';
import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/db/prisma';
import { detectLanguage, translateToUrdu, SupportedLanguage } from '@/lib/translation';
import { withAiLogging, aiWrapperCore } from '@/lib/ai-wrapper';
import { type AiWrapperRequest, type AIProviderKey } from '@/lib/ai-wrapper/types';

interface ChatRequest {
  prompt: string;
  language?: SupportedLanguage;
  translateResponse?: boolean;
  temperature?: number;
  topP?: number;
  modelHint?: {
    provider?: AIProviderKey;
    model?: string;
  };
  metadata?: Record<string, unknown>;
}

interface ChatResponse {
  message: string;
  language: SupportedLanguage;
  conversationId?: string;
}

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.email) {
      return NextResponse.json(
        { error: 'Unauthorized - Please sign in' },
        { status: 401 }
      );
    }

    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
      select: { id: true, role: true, name: true },
    });

    if (!user) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      );
    }

    const body: ChatRequest = await req.json();
    const { prompt, language, translateResponse } = body;

    if (!prompt || prompt.trim().length === 0) {
      return NextResponse.json(
        { error: 'Prompt is required' },
        { status: 400 }
      );
    }

    const detectedLang = language || detectLanguage(prompt);
    const systemMessage = buildSystemMessage(user.role, user.name || 'Student');
    const provider = body.modelHint?.provider ?? 'openai';

    type LoggedExecution = Awaited<ReturnType<typeof aiWrapperCore.execute>> & { tokens?: number };

    const aiRequest: AiWrapperRequest = {
      id: randomUUID(),
      task: 'mentor_chat',
      modality: 'text',
      input: {
        prompt,
        messages: [
          { role: 'system', content: systemMessage },
          { role: 'user', content: prompt },
        ],
        temperature: body.temperature ?? 0.7,
        topP: body.topP ?? 1,
        extra: {
          generationConfig: body.metadata?.generationConfig,
          safetySettings: body.metadata?.safetySettings,
        },
      },
      modelHint: body.modelHint,
      userId: user.id,
      locale: detectedLang,
      options: {
        guardrails: true,
        responseFormat: 'text',
      },
      metadata: {
        translateResponse,
        promptLength: prompt.length,
        ...body.metadata,
      },
    };

    const result = await withAiLogging<LoggedExecution>(
      async () => {
        const execution = await aiWrapperCore.execute(aiRequest, {
          httpRequest: req,
        });

        return {
          ...execution,
          tokens: execution.response.tokensUsed,
        };
      },
      {
        type: 'chat',
        userId: user.id,
        metadata: {
          language: detectedLang,
          translateResponse,
          promptLength: prompt.length,
          provider,
        },
      }
    );

    if (result.error) {
      return NextResponse.json(
        {
          error: 'AI service error',
          message: result.error,
          language: detectedLang,
        },
        { status: 500 }
      );
    }

    const execution = result.data!;
    const aiExecutionResponse = execution.response;

    if (!aiExecutionResponse.success) {
      return NextResponse.json(
        {
          error: 'Request blocked by guardrails',
          details: aiExecutionResponse.output,
        },
        { status: 400 }
      );
    }

    const aiMessage = String(aiExecutionResponse.output.text ?? '').trim();

    let finalResponse = aiMessage;
    let finalLanguage = detectedLang;

    if (translateResponse && detectedLang === 'ur') {
      try {
        finalResponse = await translateToUrdu(aiMessage);
        finalLanguage = 'ur';
      } catch (error) {
        console.warn('[AI Chat] Translation failed, using English response:', error);
      }
    }

    const chatHistory = await prisma.chatHistory.create({
      data: {
        userId: user.id,
        prompt,
        reply: finalResponse,
        language: finalLanguage,
      },
    });

    const response = NextResponse.json<ChatResponse>({
      message: finalResponse,
      language: finalLanguage,
      conversationId: chatHistory.id,
    });

    response.headers.set('X-AI-Latency', String(result.latency));
    const tokens = aiExecutionResponse.tokensUsed ?? execution.tokens;
    if (typeof tokens === 'number') {
      response.headers.set('X-AI-Tokens', String(tokens));
    }

    return response;
  } catch (error) {
    console.error('[AI Chat] Unexpected error:', error);
    return NextResponse.json(
      {
        error: 'Internal server error',
        message: 'An unexpected error occurred. Please try again.',
      },
      { status: 500 }
    );
  }
}

/**
 * GET /api/ai/chat
 * Retrieve chat history for the authenticated user
 */
export async function GET(req: NextRequest) {
  try {
    // Authenticate user
    const session = await getServerSession(authOptions);
    
    if (!session?.user?.email) {
      return NextResponse.json(
        { error: 'Unauthorized - Please sign in' },
        { status: 401 }
      );
    }

    // Get user from database
    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
      select: { id: true },
    });

    if (!user) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      );
    }

    // Get pagination parameters
    const { searchParams } = new URL(req.url);
    const limit = parseInt(searchParams.get('limit') || '50');
    const offset = parseInt(searchParams.get('offset') || '0');

    // Fetch chat history
    const chatHistory = await prisma.chatHistory.findMany({
      where: { userId: user.id },
      orderBy: { timestamp: 'desc' },
      take: limit,
      skip: offset,
      select: {
        id: true,
        prompt: true,
        reply: true,
        language: true,
        timestamp: true,
      },
    });

    return NextResponse.json({
      history: chatHistory,
      total: await prisma.chatHistory.count({ where: { userId: user.id } }),
    });

  } catch (error) {
    console.error('[AI Chat] Error fetching history:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

/**
 * Build system message based on user role
 */
function buildSystemMessage(role: string, userName: string): string {
  const baseMessage = `You are an AI Wrapper Mentor, an educational assistant for a bilingual (English/Urdu) learning platform. 
Your role is to help ${userName} with their studies.`;

  const roleSpecificGuidance: Record<string, string> = {
    STUDENT: `
- Provide clear, supportive explanations for academic questions
- Encourage critical thinking and problem-solving
- Break down complex concepts into simpler parts
- Suggest study strategies and resources
- Be patient and encouraging`,
    
    EDUCATOR: `
- Assist with course planning and curriculum design
- Provide insights on teaching methodologies
- Help with assessment and grading strategies
- Suggest ways to engage students effectively
- Support professional development`,
    
    ADMIN: `
- Provide insights on platform usage and analytics
- Assist with administrative tasks and queries
- Help with policy and procedure questions
- Support decision-making with data-driven insights`,
  };

  return baseMessage + (roleSpecificGuidance[role] || roleSpecificGuidance.STUDENT);
}
