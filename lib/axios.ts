import axios, { AxiosError } from 'axios';
import { useAuthStore } from '@/stores/useAuth.store';

// Define common error response types
interface ApiErrorPayload {
  isValidToken?: boolean;
  [key: string]: unknown;
}

interface ApiErrorResponse {
  message: string;
  status: number;
  error?: string;
  payload: ApiErrorPayload;
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

// Token expiration interceptor
API.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (axios.isAxiosError(error)) {
      const axiosError = error as AxiosError<ApiErrorResponse>;

      // Check for 401 status and token: false in payload
      if (axiosError.response?.status === 401 && !axiosError.response.data?.payload?.isValidToken) {
        // Clear localStorage and reset auth store
        localStorage.removeItem('auth-storage');
        window.location.reload();
        console.warn('Token expired. Clearing localStorage and resetting auth.');
        return;
      }
    }

    return Promise.reject(error);
  }
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
      status: axiosError.response?.status || 500,
      error: axiosError.code || 'NETWORK_ERROR',
      payload: {},
    };
  }

  // Handle non-Axios errors
  if (error instanceof Error) {
    return {
      message: error.message,
      status: 500,
      error: 'UNKNOWN_ERROR',
      payload: {},
    };
  }

  // Fallback for unknown error types
  return {
    message: 'An unexpected error occurred',
    status: 500,
    error: 'UNEXPECTED_ERROR',
    payload: {},
  };
};
export const buildUrl = (
  version: string = 'v1',
  service: string,
  endpoint: string,
  params?: Record<string, string | number | boolean | string[] | number[] | null | undefined>
) => {
  let url = `${version}/${service}/${endpoint}`;

  if (params && Object.keys(params).length > 0) {
    const queryString = new URLSearchParams();

    Object.entries(params).forEach(([key, value]) => {
      // Skip undefined and null values
      if (value === undefined || value === null) {
        return;
      }

      // Handle arrays
      if (Array.isArray(value)) {
        value.forEach((item) => {
          queryString.append(key, String(item));
        });
      } else {
        queryString.append(key, String(value));
      }
    });

    const queryStringified = queryString.toString();
    if (queryStringified) {
      url += `?${queryStringified}`;
    }
  }

  return url;
};

export const requestAPI = async <
  TResponse,
  TData = unknown,
  TParams extends Record<string, string | number | boolean | string[] | number[] | null | undefined> = Record<
    string,
    string | number | boolean | string[] | number[] | null | undefined
  >,
>(
  method: 'get' | 'post' | 'put' | 'patch' | 'delete',
  version: string,
  service: string,
  endpoint: string,
  data?: TData,
  params?: TParams
): Promise<TResponse> => {
  console.log('params', params);
  try {
    const url = buildUrl(version, service, endpoint, params);
    console.log('Built URL:', url); // Debug log to verify URL construction
    const response = await API.request({ method, url, data });
    return response.data;
  } catch (error: unknown) {
    throw handleApiError(error);
  }
};

export default API;
