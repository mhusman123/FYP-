import { prisma } from '@/lib/db/prisma';
import { AiLogType } from '@/lib/ai-wrapper';

interface TelemetryFilters {
  type?: AiLogType;
  startDate?: Date;
  endDate?: Date;
  userId?: string;
}

export interface TelemetrySnapshot {
  total: number;
  errorRate: number;
  averageLatency: number;
  p95Latency: number;
  totalTokens: number;
}

export async function getTelemetrySnapshot(filters: TelemetryFilters = {}): Promise<TelemetrySnapshot> {
  const where: Record<string, unknown> = {};
  if (filters.type) where.type = filters.type;
  if (filters.userId) where.userId = filters.userId;
  if (filters.startDate || filters.endDate) {
    where.createdAt = {};
    if (filters.startDate) (where.createdAt as Record<string, Date>).gte = filters.startDate;
    if (filters.endDate) (where.createdAt as Record<string, Date>).lte = filters.endDate;
  }

  const logs = await prisma.aiLogs.findMany({
    where,
    orderBy: { createdAt: 'desc' },
  });

  if (logs.length === 0) {
    return {
      total: 0,
      errorRate: 0,
      averageLatency: 0,
      p95Latency: 0,
      totalTokens: 0,
    };
  }

  const latencies = logs.map((log) => log.latency).sort((a, b) => a - b);
  const errors = logs.filter((log) => {
    const metadata = log.metadata as { error?: string } | null;
    return Boolean(metadata?.error);
  }).length;

  const averageLatency = Math.round(latencies.reduce((sum, latency) => sum + latency, 0) / latencies.length);
  const p95Latency = latencies[Math.floor(latencies.length * 0.95)] ?? latencies[latencies.length - 1];
  const totalTokens = logs.reduce((sum, log) => sum + (log.tokens ?? 0), 0);

  return {
    total: logs.length,
    errorRate: Number((errors / logs.length).toFixed(3)),
    averageLatency,
    p95Latency,
    totalTokens,
  };
}
