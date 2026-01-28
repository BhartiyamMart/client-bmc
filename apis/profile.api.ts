import { requestAPI } from '@/lib/axios';
import * as IPROFILE from '@/interfaces/profile.interface';
import { ApiResponse } from '@/interfaces/api.interface';

export const editProfile = async (data: IPROFILE.ICreateProfileREQ) => {
  return requestAPI<ApiResponse<IPROFILE.ICreateProfileRES>, IPROFILE.ICreateProfileREQ>(
    'post',
    'v1',
    'profile/customer',
    'edit-profile',
    data
  );
};
export const getProfile = async () => {
  return requestAPI<ApiResponse<IPROFILE.IGetProfileRES>, IPROFILE.IGetProfileREQ>(
    'get',
    'v1',
    'profile/customer',
    'get-profile'
  );
};

export const getGender = async () => {
  return requestAPI<ApiResponse<IPROFILE.IGetGenderRES>, IPROFILE.IGetGenderREQ>(
    'get',
    'v1',
    'master/customer',
    'get-gender'
  );
};

export const accountDetails = async () => {
  return requestAPI<ApiResponse<IPROFILE.IAccountDetailsRES>, IPROFILE.IAccountDetailsREQ>(
    'get',
    'v1',
    'details/customer',
    'account'
  );
};

export const sendEmailVerification = async (data: IPROFILE.ISendEmailVerificationREQ) => {
  return requestAPI<ApiResponse<IPROFILE.ISendEmailVerificationRES>, IPROFILE.ISendEmailVerificationREQ>(
    'post',
    'v1',
    'profile/customer',
    'request-email-verification',
    data
  );
};

export const verifyEmailOTP = async (data: IPROFILE.IVerifyEmailOTPREQ) => {
  return requestAPI<ApiResponse<IPROFILE.IVerifyEmailOTPRES>, IPROFILE.IVerifyEmailOTPREQ>(
    'post',
    'v1',
    'profile/customer',
    'verify-email',
    data
  );
};
