import { API_ENDPOINTS } from '@/config/api-endpoints';
import { apiClient, ApiResponse } from './api-client';

export class AIService {
  static async sendChatMessage(payload: {
    message: string;
    courseId?: string;
    assignmentId?: string;
  }): Promise<ApiResponse<any>> {
    return apiClient(API_ENDPOINTS.AI.CHAT_MENTOR, {
      method: 'POST',
      body: JSON.stringify(payload),
    });
  }

  static async triggerAutograde(submissionId: string): Promise<ApiResponse<any>> {
    return apiClient(API_ENDPOINTS.AI.AUTOGRADE, {
      method: 'POST',
      body: JSON.stringify({ submissionId }),
    });
  }

  static async fetchInsights(courseId?: string, period: string = 'week'): Promise<ApiResponse<any>> {
    const url = courseId 
      ? `${API_ENDPOINTS.AI.INSIGHTS}?courseId=${courseId}&period=${period}`
      : `${API_ENDPOINTS.AI.INSIGHTS}?period=${period}`;
    return apiClient(url);
  }
}
