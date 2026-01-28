export interface ApiResponse<T> {
  error: boolean;
  status: number;
  message: string;
  payload: T;
}

export interface ErrorResposne {
  error: boolean;
  status: number;
  message: string;
  payload: unknown;
}
