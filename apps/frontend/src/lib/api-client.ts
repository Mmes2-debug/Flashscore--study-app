import { backendCircuit, mlCircuit } from './circuit-breaker';
import { retryWithBackoff } from './retry';

class APIError extends Error {
  constructor(
    message: string,
    public status: number,
    public code?: string
  ) {
    super(message);
    this.name = 'APIError';
  }
}

class APIClient {
  private baseURL: string;
  private defaultHeaders: HeadersInit;

  constructor(baseURL?: string) {
    this.baseURL = baseURL || process.env.NEXT_PUBLIC_BACKEND_URL || '';
    this.defaultHeaders = {
      'Content-Type': 'application/json',
    };
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    const url = `${this.baseURL}${endpoint}`;
    const serviceName = endpoint.includes('/ml/') ? 'ML Service' : 'Backend API';
    const circuit = endpoint.includes('/ml/') ? mlCircuit : backendCircuit;

    let success = false;

    try {
      const result = await circuit.execute(() => 
        retryWithBackoff(async () => {
          try {
            const response = await fetch(url, {
              ...options,
              headers: {
                ...this.defaultHeaders,
                ...options.headers,
              },
            });

            if (!response.ok) {
              const error = await response.json().catch(() => ({
                message: response.statusText,
              }));
              throw new APIError(
                error.message || 'Request failed',
                response.status,
                error.code
              );
            }

            return response.json();
          } catch (error) {
            if (error instanceof APIError) throw error;

            console.error('API request failed:', error);
            throw new APIError(
              'Network error occurred',
              0,
              'NETWORK_ERROR'
            );
          }
        }, {
          maxAttempts: 3,
          initialDelay: 1000,
          maxDelay: 5000,
        })
      );

      success = true;
      return result;
    } finally {
      // Track error budget (imported at top of file)
      if (typeof window !== 'undefined') {
        const { errorBudget } = await import('./error-budget');
        errorBudget.track(serviceName, success);
      }
    }
  }

  async get<T>(endpoint: string, options?: RequestInit): Promise<T> {
    return this.request<T>(endpoint, { ...options, method: 'GET' });
  }

  async post<T>(endpoint: string, data?: any, options?: RequestInit): Promise<T> {
    return this.request<T>(endpoint, {
      ...options,
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async put<T>(endpoint: string, data?: any, options?: RequestInit): Promise<T> {
    return this.request<T>(endpoint, {
      ...options,
      method: 'PUT',
      body: JSON.stringify(data),
    });
  }

  async delete<T>(endpoint: string, options?: RequestInit): Promise<T> {
    return this.request<T>(endpoint, { ...options, method: 'DELETE' });
  }
}

export const apiClient = new APIClient();
export { APIError };