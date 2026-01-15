import { requestAPI } from '@/lib/axios';
import * as IREFERRAL from '@/interfaces/referral.interface';
import { ApiResponse } from '@/interfaces/api.interface';

export const getReferralCode = async () => {
  return requestAPI<ApiResponse<IREFERRAL.IReferralRES>, IREFERRAL.IReferralREQ>('get', 'v1', 'profile/customer', 'my-referral-code');
};


export const generateReferral = async () => {
  return requestAPI<ApiResponse<IREFERRAL.IGenReferralRES>, IREFERRAL.IGenReferralREQ>(
    'post',
    'v1',
    'profile/customer',
    'create-referral-code'
  );
};