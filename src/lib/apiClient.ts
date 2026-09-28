import { axiosInstance } from "./axios";

export interface ApiResponse<T> {
  data: T;
  message?: string;
  statusCode?: number;
}

export interface ApiErrorResponse {
  message: string;
  statusCode: number;
  errors?: Record<string, string>;
}

export type HttpMethod = "GET" | "POST" | "PUT" | "DELETE" | "PATCH";

interface RequestConfig {
  params?: Record<string, any>;
  headers?: Record<string, string>;
}

class ApiClient {
  private async request<T>(
    method: HttpMethod,
    endpoint: string,
    data?: any,
    config?: RequestConfig
  ): Promise<T> {
    try {
      const response = await axiosInstance({
        method,
        url: endpoint,
        data,
        ...config,
      });
      return response.data;
    } catch (error) {
      this.handleError(error);
      throw error;
    }
  }

  get<T>(endpoint: string, config?: RequestConfig): Promise<T> {
    return this.request<T>("GET", endpoint, undefined, config);
  }

  post<T>(endpoint: string, data?: any, config?: RequestConfig): Promise<T> {
    return this.request<T>("POST", endpoint, data, config);
  }

  put<T>(endpoint: string, data?: any, config?: RequestConfig): Promise<T> {
    return this.request<T>("PUT", endpoint, data, config);
  }

  patch<T>(endpoint: string, data?: any, config?: RequestConfig): Promise<T> {
    return this.request<T>("PATCH", endpoint, data, config);
  }

  delete<T>(endpoint: string, config?: RequestConfig): Promise<T> {
    return this.request<T>("DELETE", endpoint, undefined, config);
  }

  private handleError(error: any): void {
    if (error.response) {
      // Server responded with error status
      const errorData = error.response.data as ApiErrorResponse;
      console.error("API Error:", {
        status: error.response.status,
        message: errorData.message || "An error occurred",
        errors: errorData.errors,
      });
    } else if (error.request) {
      // Request made but no response
      console.error("No response from server:", error.request);
    } else {
      // Other errors
      console.error("Error:", error.message);
    }
  }
}

export const apiClient = new ApiClient();
