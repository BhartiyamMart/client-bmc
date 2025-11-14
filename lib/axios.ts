import axios, { AxiosError } from 'axios';
import { useAuthStore } from '@/stores/useAuth.store';

// Define common error response types
interface ApiErrorResponse {
  message: string;
  statusCode: number;
  error?: string;
  details?: unknown;
}

const API = axios.create({
  baseURL: process.env.NEXT_PUBLIC_SERVER_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000,
});

API.interceptors.request.use(
  async (config) => {
    const encryptedToken = useAuthStore.getState().token;
    if (encryptedToken) {
      try {
        config.headers['Authorization'] = `Bearer ${encryptedToken}`;
      } catch (err) {
        console.error('Error attaching token to request:', err);
      }
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Enhanced error handling function
const handleApiError = (error: unknown): ApiErrorResponse => {
  // Check if it's an Axios error
  if (axios.isAxiosError(error)) {
    const axiosError = error as AxiosError<ApiErrorResponse>;

    // If we have a response with error data
    if (axiosError.response?.data) {
      return axiosError.response.data;
    }

    // If no response data, create a structured error
    return {
      message: axiosError.message || 'Network error occurred',
      statusCode: axiosError.response?.status || 500,
      error: axiosError.code || 'NETWORK_ERROR',
    };
  }

  // Handle non-Axios errors
  if (error instanceof Error) {
    return {
      message: error.message,
      statusCode: 500,
      error: 'UNKNOWN_ERROR',
    };
  }

  // Fallback for unknown error types
  return {
    message: 'An unexpected error occurred',
    statusCode: 500,
    error: 'UNEXPECTED_ERROR',
  };
};

export const buildUrl = (version: string = 'v1', service: string, endpoint: string) => {
  return `${version}/${service}/${endpoint}`;
};

export const requestAPI = async <TResponse, TData = unknown, TParams = Record<string, string | number | boolean>>(
  method: 'get' | 'post' | 'put' | 'patch' | 'delete',
  version: string,
  service: string,
  endpoint: string,
  data?: TData,
  params?: TParams
): Promise<TResponse> => {
  try {
    const url = buildUrl(version, service, endpoint);
    const response = await API.request({ method, url, data, params });
    return response.data;
  } catch (error: unknown) {
    throw handleApiError(error);
  }
};

export default API;
