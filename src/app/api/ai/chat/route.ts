/**
 * AI Mentor Chat API Endpoint
 * Provides bilingual (English + Urdu) study assistance using OpenAI
 */

import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/db/prisma';
import { detectLanguage, translateToUrdu, SupportedLanguage } from '@/lib/translation';
import { withAiLogging } from '@/lib/ai-wrapper';

interface ChatRequest {
  prompt: string;
  language?: SupportedLanguage;
  translateResponse?: boolean;
}

interface ChatResponse {
  message: string;
  language: SupportedLanguage;
  conversationId?: string;
}

/**
 * POST /api/ai/chat
 * 
 * Request Body:
 * {
 *   prompt: string;
 *   language?: 'en' | 'ur';
 *   translateResponse?: boolean;
 * }
 * 
 * Response:
 * {
 *   message: string;
 *   language: 'en' | 'ur';
 *   conversationId?: string;
 * }
 */
export async function POST(req: NextRequest) {
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
      select: { id: true, role: true, name: true },
    });

    if (!user) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      );
    }

    // Parse request body
    const body: ChatRequest = await req.json();
    const { prompt, language, translateResponse } = body;

    if (!prompt || prompt.trim().length === 0) {
      return NextResponse.json(
        { error: 'Prompt is required' },
        { status: 400 }
      );
    }

    // Detect language of prompt
    const detectedLang = language || detectLanguage(prompt);
    
    // Check if OpenAI API key is configured
    const openaiApiKey = process.env.OPENAI_API_KEY;
    
    if (!openaiApiKey) {
      console.error('[AI Chat] OpenAI API key not configured');
      return NextResponse.json(
        { 
          error: 'AI service not configured',
          message: 'The AI Mentor service is currently unavailable. Please contact your administrator.',
          language: detectedLang,
        },
        { status: 503 }
      );
    }

    // Build system message based on user role
    const systemMessage = buildSystemMessage(user.role, user.name || 'Student');

    // Wrap AI call with logging
    const result = await withAiLogging(
      async () => {
        // Call OpenAI API
        let aiResponse: string;
        try {
          aiResponse = await callOpenAI(systemMessage, prompt, openaiApiKey);
        } catch (error) {
          console.error('[AI Chat] OpenAI API error:', error);
          throw new Error('Failed to get response from AI');
        }

        // Translate response if requested and language is Urdu
        let finalResponse = aiResponse;
        let finalLanguage = detectedLang;

        if (translateResponse && detectedLang === 'ur') {
          try {
            finalResponse = await translateToUrdu(aiResponse);
            finalLanguage = 'ur';
          } catch (error) {
            console.warn('[AI Chat] Translation failed, using English response:', error);
            // Keep English response if translation fails
          }
        }

        // Store conversation in database
        const chatHistory = await prisma.chatHistory.create({
          data: {
            userId: user.id,
            prompt: prompt,
            reply: finalResponse,
            language: finalLanguage,
          },
        });

        // Return response
        return NextResponse.json<ChatResponse>({
          message: finalResponse,
          language: finalLanguage,
          conversationId: chatHistory.id,
        });
      },
      {
        type: 'chat',
        userId: user.id,
        metadata: {
          language: detectedLang,
          translateResponse,
          promptLength: prompt.length,
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

    // Add latency headers
    const response = result.data!;
    response.headers.set('X-AI-Latency', String(result.latency));
    if (result.tokens) {
      response.headers.set('X-AI-Tokens', String(result.tokens));
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

/**
 * Call OpenAI API with GPT-3.5/4
 */
async function callOpenAI(
  systemMessage: string,
  userPrompt: string,
  apiKey: string
): Promise<string> {
  const model = process.env.OPENAI_MODEL || 'gpt-3.5-turbo';
  
  const response = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model,
      messages: [
        { role: 'system', content: systemMessage },
        { role: 'user', content: userPrompt },
      ],
      temperature: 0.7,
      max_tokens: 1000,
    }),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(`OpenAI API error: ${response.status} - ${JSON.stringify(errorData)}`);
  }

  const data = await response.json();
  
  if (!data.choices?.[0]?.message?.content) {
    throw new Error('Invalid response from OpenAI API');
  }

  return data.choices[0].message.content;
}
