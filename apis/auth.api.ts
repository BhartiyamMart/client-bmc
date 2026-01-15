import { requestAPI } from '@/lib/axios';
import * as IAUTH from '@/interfaces/auth.interface';
import { ApiResponse } from '@/interfaces/api.interface';

export const sendOtp = async (data: IAUTH.IOtpREQ) => {
  return requestAPI<ApiResponse<IAUTH.IOtpRES>, IAUTH.IOtpREQ>('post', 'v1', 'auth', 'customer/send-otp', data);
};

export const verifyOtp = async (data: IAUTH.IVerifyOtpREQ) => {
  return requestAPI<ApiResponse<IAUTH.IVerifyOtpRES>, IAUTH.IVerifyOtpREQ>(
    'post',
    'v1',
    'auth/customer',
    'verify-otp',
    data
  );
};

export const logout = async () => {
  return requestAPI<ApiResponse<IAUTH.ILogoutRES>>('post', 'v1', 'auth/customer', 'logout');
};

export const accountDelete = async (data: IAUTH.IAccountDeleteREQ) => {
  return requestAPI<ApiResponse<IAUTH.IAccountDeleteRES>, IAUTH.IAccountDeleteREQ>(
    'post',
    'v1',
    'auth/customer',
    'delete-account',
    data
  );
};

export const accountDeleteReason = async () => {
  return requestAPI<ApiResponse<IAUTH.IAccountDeleteRES>, IAUTH.IAccountDeleteREQ>(
    'get',
    'v1',
    'master/customer',
    'delete-user-reasons'
  );
};
