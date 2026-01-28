export interface ApiResponse<T> {
  error: boolean;
  status: number;
  message: string;
  payload: T;
}

export interface ErrorResponse {
  error: boolean;
  status: number;
  message: string;
  payload: unknown;
}
