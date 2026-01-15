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
  return requestAPI<ApiResponse<IPROFILE.IAccountDeleteRES>, IPROFILE.IAccountDeleteREQ>(
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
