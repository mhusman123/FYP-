/**
 * Unified API Client with error handling and response formatting
 */

export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export async function apiClient<T = any>(
  endpoint: string,
  options: RequestInit = {}
): Promise<ApiResponse<T>> {
  try {
    const headers = new Headers(options.headers || {});
    if (!headers.has('Content-Type') && !(options.body instanceof FormData)) {
      headers.set('Content-Type', 'application/json');
    }

    const response = await fetch(endpoint, {
      ...options,
      headers,
    });

    const json = await response.json().catch(() => null);

    if (!response.ok) {
      return {
        success: false,
        error: json?.error || json?.message || `HTTP error ${response.status}`,
        data: json?.data,
      };
    }

    return {
      success: true,
      data: json?.data !== undefined ? json.data : json,
      message: json?.message,
    };
  } catch (error: any) {
    return {
      success: false,
      error: error.message || 'Network request failed',
    };
  }
}
