/**
 * AI Wrapper Middleware
 * Provides logging, metrics tracking, and unified error handling for AI endpoints
 */

import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db/prisma';
import { PrismaClient } from '@prisma/client';

// Extend prisma client type to include aiLogs
type ExtendedPrismaClient = PrismaClient & {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  aiLogs: any;
};

const extendedPrisma = prisma as ExtendedPrismaClient;

export type AiLogType = 'chat' | 'autograde' | 'insights' | 'core';

interface AiWrapperOptions {
  type: AiLogType;
  userId?: string;
  metadata?: Record<string, unknown>;
}

interface AiWrapperResult<T> {
  data?: T;
  error?: string;
  latency: number;
  tokens?: number;
}

/**
 * Wraps an AI operation with logging and metrics tracking
 * @param operation - The async function to execute
 * @param options - Configuration options for logging
 * @returns The result with metrics
 */
export async function withAiLogging<T>(
  operation: () => Promise<T>,
  options: AiWrapperOptions
): Promise<AiWrapperResult<T>> {
  const startTime = Date.now();
  let tokens: number | undefined;
  let error: string | undefined;
  let data: T | undefined;

  try {
    data = await operation();
    
    // Extract token count if available in the response
    if (data && typeof data === 'object' && 'tokens' in data) {
      tokens = (data as { tokens: number }).tokens;
    }
  } catch (err) {
    error = err instanceof Error ? err.message : 'Unknown error occurred';
    console.error(`[AI Wrapper] Error in ${options.type}:`, err);
  } finally {
    const latency = Date.now() - startTime;

    // Log to database (fire and forget - don't block the response)
    logAiRequest({
      type: options.type,
      latency,
      tokens,
      userId: options.userId,
      metadata: {
        ...options.metadata,
        error,
        success: !error,
      },
    }).catch((logError) => {
      console.error('[AI Wrapper] Failed to log AI request:', logError);
    });

    return {
      data,
      error,
      latency,
      tokens,
    };
  }
}

/**
 * Logs AI request metrics to the database
 */
async function logAiRequest(log: {
  type: string;
  latency: number;
  tokens?: number;
  userId?: string;
  metadata?: Record<string, unknown>;
}) {
  await extendedPrisma.aiLogs.create({
    data: {
      type: log.type,
      latency: log.latency,
      tokens: log.tokens,
      userId: log.userId,
      metadata: log.metadata || {},
    },
  });
}

/**
 * Higher-order function to wrap Next.js API route handlers with AI logging
 */
export function withAiWrapper(
  handler: (req: NextRequest) => Promise<NextResponse>,
  options: Omit<AiWrapperOptions, 'userId'>
) {
  return async (req: NextRequest): Promise<NextResponse> => {
    const result = await withAiLogging(
      async () => {
        return await handler(req);
      },
      {
        ...options,
        metadata: {
          ...options.metadata,
          method: req.method,
          url: req.url,
        },
      }
    );

    if (result.error) {
      return NextResponse.json(
        { error: result.error },
        { status: 500 }
      );
    }

    return result.data || NextResponse.json({ error: 'No data returned' }, { status: 500 });
  };
}

/**
 * Get AI usage statistics
 */
export async function getAiUsageStats(options?: {
  type?: AiLogType;
  userId?: string;
  startDate?: Date;
  endDate?: Date;
}) {
  const where: {
    type?: string;
    userId?: string;
    createdAt?: { gte?: Date; lte?: Date };
  } = {};

  if (options?.type) where.type = options.type;
  if (options?.userId) where.userId = options.userId;
  if (options?.startDate || options?.endDate) {
    where.createdAt = {};
    if (options.startDate) where.createdAt.gte = options.startDate;
    if (options.endDate) where.createdAt.lte = options.endDate;
  }

  const logs = await extendedPrisma.aiLogs.findMany({
    where,
    orderBy: { createdAt: 'desc' },
  });

  // Calculate statistics
  const totalRequests = logs.length;
  const averageLatency = logs.length > 0
    ? Math.round(logs.reduce((sum: number, log: { latency: number }) => sum + log.latency, 0) / logs.length)
    : 0;
  const totalTokens = logs.reduce((sum: number, log: { tokens?: number }) => sum + (log.tokens || 0), 0);
  const errorCount = logs.filter((log: { metadata?: { error?: string } }) => {
    const metadata = log.metadata as { error?: string };
    return metadata?.error;
  }).length;

  return {
    totalRequests,
    averageLatency,
    totalTokens,
    errorCount,
    successRate: totalRequests > 0 
      ? Math.round(((totalRequests - errorCount) / totalRequests) * 100)
      : 0,
    logs: logs.slice(0, 100), // Return latest 100 logs
  };
}

/**
 * Middleware for API routes to extract user ID from session
 */
export async function extractUserId(): Promise<string | undefined> {
  // This would typically use getServerSession, but we'll keep it simple
  // and let the individual routes handle session management
  return undefined;
}

export * from './ai-wrapper/index';
export * from './ai-wrapper/types';
export * from './ai-wrapper/analytics';
export * from './ai-wrapper/eval';
export * from './ai-wrapper/security';
