import { requestAPI } from '@/lib/axios';
import * as IREFERRAL from '@/interfaces/referral.interface';
import { ApiResponse } from '@/interfaces/api.interface';

export const getReferralCode = async () => {
  return requestAPI<ApiResponse<IREFERRAL.IGetReferralStatsRES>, IREFERRAL.IGetReferralStatsREQ>(
    'get',
    'v1',
    'referral/customer',
    'my-referral-code'
  );
};

export const generateReferral = async () => {
  return requestAPI<ApiResponse<IREFERRAL.IGenReferralRES>, IREFERRAL.IGenReferralREQ>(
    'post',
    'v1',
    'referral/customer',
    'create-referral-code'
  );
};
