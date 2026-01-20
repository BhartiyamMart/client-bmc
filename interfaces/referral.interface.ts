export interface IGenReferralREQ {}
export interface IGenReferralRES {
  referralCode: string;
}

export interface ReferralData {
  hasReferralCode: boolean;
  code: string;
  recentReferrals: [];
  totalReferrals: number;
}

export interface IGetReferralStatsREQ {}
export type IGetReferralStatsRES = ReferralData;
