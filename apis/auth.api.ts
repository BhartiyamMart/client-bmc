import { requestAPI } from '@/lib/axios';
import * as IAUTH from '@/interfaces/auth.interface';
import { ApiResponse } from '@/interfaces/api.interface';

export const sendOtp = async (data: IAUTH.IOtpREQ) => {
  return requestAPI<ApiResponse<IAUTH.IOtpRES>, IAUTH.IOtpREQ>('post', 'v1', 'auth', 'send-otp', data);
};

export const verifyOtp = async (data: IAUTH.IVerifyOtpREQ) => {
  return requestAPI<ApiResponse<IAUTH.IVerifyOtpRES>, IAUTH.IVerifyOtpREQ>('post', 'v1', 'auth', 'verify-otp', data);
};

export const editProfile = async (data: IAUTH.ICreateProfileREQ) => {
  return requestAPI<ApiResponse<IAUTH.ICreateProfileRES>, IAUTH.ICreateProfileREQ>(
    'post',
    'v1',
    'profile',
    'edit-profile',
    data
  );
};

export const logout = async () => {
  return requestAPI<ApiResponse<IAUTH.ILogoutRES>>('post', 'v1', 'auth', 'logout');
};
