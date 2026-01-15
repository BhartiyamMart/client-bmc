export interface IUser {
  phone: string;
  email: string | null;
}

export interface IProfile {
  id: string;
  name: string;
  photo: string | null;
  gender: 'MALE' | 'FEMALE' | 'OTHER';
}

export interface ICreateProfileData {
  profile: IProfile;
  myReferralCode: string;
  referralApplied: boolean;
  referralInfo: IReferralInfo | null;
}

export interface IUserProfile {
  name: string;
  photo?: string | null;
  dateOfBirth?: string | null;
  gender?: string | null;
}

export interface IWalletData {
  amount : number;
}

export interface IAccountDetailsREQ {}

export interface IAccountDetailsRES {
  user: IUser;
  profile: ICustomerProfile;
  wallet: IWalletData;
}

export interface ICreateProfileREQ {
  name: string;
  referralCode?: string;
}

export interface ICreateProfileRES {
  statusCode: number;
  message: string;
  data: ICreateProfileData;
}

export interface IGetProfileREQ {}

export interface IGetProfileRES {
  user: IUser;
  profile: IUserProfile;
  referralInfo: IReferralInfo;
}

export interface ICustomerProfile {
  hasProfile: boolean;
  name: string;
  phone: string;
  dateOfBirth: string | null;
  gender: string | null;
}

export interface IReferral {
  hasReferralCode: boolean;
  code: string;
  isActive: boolean;
  totalReferrals: number;
  successfulReferrals: number;
  pendingReferrals: number;
  totalEarnings: string;
}

export interface IReferralInfo {
  wasReferred: boolean | null;
  message: string | null;
  referralCode: string;
  totalReferrals: string;
}
