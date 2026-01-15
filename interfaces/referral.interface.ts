export interface IReferralRES {
  hasReferralCode: boolean;
  code: string;
  totalReferrals: 0;
}
export interface IReferralREQ {}

export interface IGenReferralREQ {}
export interface IGenReferralRES {
  referralCode: string;
}
