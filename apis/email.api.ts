import { ApiResponse } from '@/interfaces/api.interface';
import { requestAPI } from '@/lib/axios';

export const sendTicket = (name: string, mobile: string, message: string, email: string) => {
  return requestAPI<ApiResponse<{}>>('post', 'v1', 'notification', 'send-email', { name, mobile, message, to: email });
};
