export type BackendResponse<T> = {
  statusCode: number;
  success: boolean;
  message: string;
  data: T;
};