export interface ApiResponse<T> {
  error: boolean;
  status: number;
  message: string;
  payload: T;
}
