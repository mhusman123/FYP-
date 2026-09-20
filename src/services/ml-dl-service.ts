import { API_ENDPOINTS } from '@/config/api-endpoints';
import { apiClient, ApiResponse } from './api-client';
import { 
  MLGradePredictionPayload, 
  MLGradePredictionResult, 
  DLEssayScoringPayload, 
  DLEssayScoringResult 
} from '@/types/ai-architecture';

export class MLDLService {
  static async predictStudentGrade(
    payload: MLGradePredictionPayload
  ): Promise<ApiResponse<MLGradePredictionResult>> {
    return apiClient(API_ENDPOINTS.AI.MICROSERVICES.ML_GRADE_PREDICTOR, {
      method: 'POST',
      body: JSON.stringify(payload),
    });
  }

  static async scoreEssayNeural(
    payload: DLEssayScoringPayload
  ): Promise<ApiResponse<DLEssayScoringResult>> {
    return apiClient(API_ENDPOINTS.AI.MICROSERVICES.DL_ESSAY_SCORER, {
      method: 'POST',
      body: JSON.stringify(payload),
    });
  }
}
