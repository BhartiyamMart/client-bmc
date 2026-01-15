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

export const editProfile = async (data: IAUTH.ICreateProfileREQ) => {
  return requestAPI<ApiResponse<IAUTH.ICreateProfileRES>, IAUTH.ICreateProfileREQ>(
    'post',
    'v1',
    'profile/customer',
    'edit-profile',
    data
  );
};
export const getProfile = async () => {
  return requestAPI<ApiResponse<IAUTH.IGetProfileRES>, IAUTH.IGetProfileREQ>(
    'get',
    'v1',
    'profile/customer',
    'get-profile'
  );
};

export const logout = async () => {
  return requestAPI<ApiResponse<IAUTH.ILogoutRES>>('post', 'v1', 'auth/customer', 'logout');
};

export const accountDetails = async () => {
  return requestAPI<ApiResponse<IAUTH.IAccountDetailsRES>, IAUTH.IAccountDetailsREQ>(
    'get',
    'v1',
    'details/customer',
    'account'
  );
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
