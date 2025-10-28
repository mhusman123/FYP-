import { AiWrapperRequest, EvaluationMetricResult, EvaluationRunResult, EvaluationSample } from '../types';

export interface EvaluationMetric {
  name: string;
  description: string;
  calculate(sample: EvaluationSample): EvaluationMetricResult;
}

export class ExactMatchMetric implements EvaluationMetric {
  readonly name = 'exact_match';
  readonly description = 'Checks if actual output matches expected exactly.';

  calculate(sample: EvaluationSample): EvaluationMetricResult {
    const expected = JSON.stringify(sample.expected);
    const actual = JSON.stringify(sample.actual ?? {});
    return {
      metric: this.name,
      score: expected === actual ? 1 : 0,
      detail: {
        expected,
        actual,
      },
    };
  }
}

export class LatencyBudgetMetric implements EvaluationMetric {
  readonly name = 'latency_budget';
  readonly description = 'Scores latency adherence where <= budget is 1, else decays.';

  constructor(private readonly budgetMs: number) {}

  calculate(sample: EvaluationSample): EvaluationMetricResult {
    const latency = Number(sample.metadata?.latencyMs ?? 0);
    const score = latency <= this.budgetMs ? 1 : Math.max(0, 1 - (latency - this.budgetMs) / this.budgetMs);
    return {
      metric: this.name,
      score,
      detail: {
        latency,
        budgetMs: this.budgetMs,
      },
    };
  }
}

export class EvaluationRunner {
  private readonly metrics: EvaluationMetric[];

  constructor(metrics: EvaluationMetric[] = [new ExactMatchMetric()]) {
    this.metrics = metrics;
  }

  async run(request: AiWrapperRequest, samples: EvaluationSample[]): Promise<EvaluationRunResult> {
    const startedAt = new Date();

    const metrics: EvaluationMetricResult[] = [];
    for (const sample of samples) {
      for (const metric of this.metrics) {
        metrics.push(metric.calculate(sample));
      }
    }

    return {
      request,
      samples,
      metrics,
      startedAt,
      completedAt: new Date(),
    };
  }
}
