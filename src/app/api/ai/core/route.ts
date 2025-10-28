/**
 * AI Core Router API Endpoint
 * Unified endpoint that routes AI requests to appropriate handlers
 * Supports: chat, autograde, insights
 */

import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { withAiLogging } from '@/lib/ai-wrapper';

// Import handlers from individual routes
async function handleChat(req: NextRequest, _session: { user: { id: string; email: string; role: string } }) {
  const body = await req.json();
  
  // Import the chat handler logic
  const { POST: chatHandler } = await import('../chat/route');
  
  // Create a new request with the body
  const chatRequest = new NextRequest(req.url, {
    method: 'POST',
    headers: req.headers,
    body: JSON.stringify(body),
  });
  
  return await chatHandler(chatRequest);
}

async function handleAutograde(req: NextRequest, _session: { user: { id: string; email: string; role: string } }) {
  const body = await req.json();
  
  // Import the autograde handler logic
  const { POST: autogradeHandler } = await import('../autograde/route');
  
  // Create a new request with the body
  const autogradeRequest = new NextRequest(req.url, {
    method: 'POST',
    headers: req.headers,
    body: JSON.stringify(body),
  });
  
  return await autogradeHandler(autogradeRequest);
}

async function handleInsights(req: NextRequest, _session: { user: { id: string; email: string; role: string } }) {
  // Import the insights handler logic
  const { GET: insightsHandler } = await import('../insights/route');
  
  // Create a new request preserving query params
  const insightsRequest = new NextRequest(req.url, {
    method: 'GET',
    headers: req.headers,
  });
  
  return await insightsHandler(insightsRequest);
}

/**
 * POST /api/ai/core
 * 
 * Request Body:
 * {
 *   type: 'chat' | 'autograde' | 'insights';
 *   ...type-specific params
 * }
 * 
 * Routes requests to appropriate AI handlers with unified logging
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

    // Parse request to determine type
    const body = await req.json();
    const { type, ...params } = body;

    if (!type) {
      return NextResponse.json(
        { error: 'Missing "type" parameter. Must be one of: chat, autograde, insights' },
        { status: 400 }
      );
    }

    // Wrap the operation with AI logging
    const result = await withAiLogging(
      async () => {
        // Create a new request with the params
        const newReq = new NextRequest(req.url, {
          method: 'POST',
          headers: req.headers,
          body: JSON.stringify(params),
        });

        switch (type) {
          case 'chat':
            return await handleChat(newReq, { user: session.user as { id: string; email: string; role: string } });
          
          case 'autograde':
            return await handleAutograde(newReq, { user: session.user as { id: string; email: string; role: string } });
          
          case 'insights':
            // Insights uses GET, so we need to handle it differently
            const url = new URL(req.url);
            if (params.courseId) url.searchParams.set('courseId', params.courseId);
            if (params.period) url.searchParams.set('period', params.period);
            
            const getReq = new NextRequest(url, {
              method: 'GET',
              headers: req.headers,
            });
            return await handleInsights(getReq, { user: session.user as { id: string; email: string; role: string } });
          
          default:
            return NextResponse.json(
              { error: `Invalid type: ${type}. Must be one of: chat, autograde, insights` },
              { status: 400 }
            );
        }
      },
      {
        type: 'core',
        userId: session.user.id,
        metadata: {
          requestType: type,
          params,
        },
      }
    );

    if (result.error) {
      return NextResponse.json(
        { error: result.error, latency: result.latency },
        { status: 500 }
      );
    }

    // Add latency header to response
    if (result.data) {
      const response = result.data as NextResponse;
      response.headers.set('X-AI-Latency', String(result.latency));
      if (result.tokens) {
        response.headers.set('X-AI-Tokens', String(result.tokens));
      }
      return response;
    }

    return NextResponse.json(
      { error: 'No response from handler' },
      { status: 500 }
    );
  } catch (error) {
    console.error('[AI Core] Error:', error);
    return NextResponse.json(
      { 
        error: 'Internal server error',
        message: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}

/**
 * GET /api/ai/core
 * 
 * Query params:
 * - type: 'insights' | 'stats'
 * - For insights: courseId, period
 * - For stats: startDate, endDate
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

    const { searchParams } = new URL(req.url);
    const type = searchParams.get('type');

    if (!type) {
      return NextResponse.json(
        { error: 'Missing "type" query parameter. Must be one of: insights, stats' },
        { status: 400 }
      );
    }

    // Wrap the operation with AI logging
    const result = await withAiLogging(
      async () => {
        switch (type) {
          case 'insights':
            return await handleInsights(req, { user: session.user as { id: string; email: string; role: string } });
          
          case 'stats': {
            // Get AI usage statistics
            const { getAiUsageStats } = await import('@/lib/ai-wrapper');
            
            const startDate = searchParams.get('startDate') 
              ? new Date(searchParams.get('startDate')!)
              : undefined;
            const endDate = searchParams.get('endDate')
              ? new Date(searchParams.get('endDate')!)
              : undefined;
            const aiType = searchParams.get('aiType') as 'chat' | 'autograde' | 'insights' | 'core' | undefined;

            const stats = await getAiUsageStats({
              type: aiType,
              userId: session.user.id,
              startDate,
              endDate,
            });

            return NextResponse.json(stats);
          }
          
          default:
            return NextResponse.json(
              { error: `Invalid type: ${type}. Must be one of: insights, stats` },
              { status: 400 }
            );
        }
      },
      {
        type: 'core',
        userId: session.user.id,
        metadata: {
          requestType: type,
          params: Object.fromEntries(searchParams.entries()),
        },
      }
    );

    if (result.error) {
      return NextResponse.json(
        { error: result.error, latency: result.latency },
        { status: 500 }
      );
    }

    // Add latency header to response
    if (result.data) {
      const response = result.data as NextResponse;
      response.headers.set('X-AI-Latency', String(result.latency));
      if (result.tokens) {
        response.headers.set('X-AI-Tokens', String(result.tokens));
      }
      return response;
    }

    return NextResponse.json(
      { error: 'No response from handler' },
      { status: 500 }
    );
  } catch (error) {
    console.error('[AI Core] Error:', error);
    return NextResponse.json(
      { 
        error: 'Internal server error',
        message: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}
