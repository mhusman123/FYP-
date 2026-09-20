/**
 * Sindh School of Technology (SST) - AI / ML / DL Architecture Type Definitions
 */

export type AIModelTier = 'standard' | 'advanced_reasoning' | 'deep_learning' | 'multimodal';

export interface SocraticPromptPayload {
  message: string;
  context?: string;
  courseId?: string;
  assignmentId?: string;
  previousTurns?: Array<{ role: 'user' | 'assistant'; content: string }>;
  pedagogicalGoal?: string;
}

export interface SocraticResponseData {
  reply: string;
  guidingQuestions?: string[];
  suggestedResources?: Array<{ title: string; url: string; topic: string }>;
  confidence: number;
  tokensUsed?: number;
}

export interface MLGradePredictionPayload {
  studentId: string;
  courseId: string;
  attendanceRate: number;
  submissionCount: number;
  averageQuizScore: number;
  forumParticipationCount: number;
}

export interface MLGradePredictionResult {
  predictedFinalGrade: number;
  predictedLetterGrade: string;
  atRiskStatus: boolean;
  confidenceInterval: [number, number];
  keyContributingFactors: Array<{ factor: string; impact: 'positive' | 'negative'; weight: number }>;
}

export interface DLEssayScoringPayload {
  submissionId: string;
  essayText: string;
  rubricCriteria: Array<{ criterion: string; maxScore: number; description: string }>;
}

export interface DLEssayScoringResult {
  overallScore: number;
  maxScore: number;
  rubricBreakdown: Record<string, number>;
  linguisticMetrics: {
    coherence: number;
    lexicalDiversity: number;
    syntacticComplexity: number;
  };
  feedbackComments: string[];
}
