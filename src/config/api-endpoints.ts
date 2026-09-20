/**
 * Sindh School of Technology (SST) - Centralized API & AI Microservices Configuration
 */

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || '';
const AI_SERVICE_URL = process.env.NEXT_PUBLIC_AI_SERVICE_URL || process.env.NEXT_PUBLIC_API_URL || '';

export const API_ENDPOINTS = {
  AUTH: {
    SIGNIN: `${API_BASE_URL}/api/auth/signin`,
    SIGNUP: `${API_BASE_URL}/api/auth/signup`,
    SESSION: `${API_BASE_URL}/api/auth/session`,
    ME: `${API_BASE_URL}/api/users/me`,
    USERS: `${API_BASE_URL}/api/users`,
  },
  COURSES: {
    BASE: `${API_BASE_URL}/api/courses`,
    DETAIL: (id: string) => `${API_BASE_URL}/api/courses/${id}`,
    ENROLL: (id: string) => `${API_BASE_URL}/api/courses/${id}/enroll`,
  },
  ASSIGNMENTS: {
    BASE: `${API_BASE_URL}/api/assignments`,
    DETAIL: (id: string) => `${API_BASE_URL}/api/assignments/${id}`,
  },
  SUBMISSIONS: {
    BASE: `${API_BASE_URL}/api/submissions`,
    DETAIL: (id: string) => `${API_BASE_URL}/api/submissions/${id}`,
    GRADE: (id: string) => `${API_BASE_URL}/api/submissions/${id}/grade`,
  },
  GRADES: {
    BASE: `${API_BASE_URL}/api/grades`,
    ADJUSTMENTS: `${API_BASE_URL}/api/grades/adjustments`,
    REVIEW_ADJUSTMENT: (id: string) => `${API_BASE_URL}/api/grades/adjustments/${id}/review`,
  },
  AI: {
    CORE: `${AI_SERVICE_URL}/api/ai/core`,
    CHAT_MENTOR: `${AI_SERVICE_URL}/api/ai/chat`,
    AUTOGRADE: `${AI_SERVICE_URL}/api/ai/autograde`,
    AUTOGRADING_CONFIG: `${AI_SERVICE_URL}/api/autograding/config`,
    INSIGHTS: `${AI_SERVICE_URL}/api/ai/insights`,
    PLAGIARISM: `${AI_SERVICE_URL}/api/plagiarism`,
    MICROSERVICES: {
      GENAI_SOCRATIC: `${AI_SERVICE_URL}/ai/v1/socratic-tutor`,
      ML_GRADE_PREDICTOR: `${AI_SERVICE_URL}/ai/v1/ml/predict-grade`,
      ML_RISK_CLASSIFIER: `${AI_SERVICE_URL}/ai/v1/ml/risk-classifier`,
      DL_ESSAY_SCORER: `${AI_SERVICE_URL}/ai/v1/dl/score-essay`,
      DL_SPEECH_ANALYZER: `${AI_SERVICE_URL}/ai/v1/dl/speech-pronunciation`,
      RAG_SEARCH: `${AI_SERVICE_URL}/ai/v1/rag/query`,
    }
  },
  BADGES: {
    BASE: `${API_BASE_URL}/api/badges`,
  },
} as const;
