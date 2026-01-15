import { UUID } from 'node:crypto';

export interface IOtpREQ {
  phone: string;
}

export interface IOtpRES {
  otp: string;
}

export interface IVerifyOtpREQ {
  phone: string;
  otp: string;
  deviceInfo: {
    deviceType: string;
  };
}
export interface IUserProfile {
  name: string;
  photo?: string | null;
  dateOfBirth?: string | null;
  gender?: string | null;
}
export interface IVerifyOtpRES {
  token: string;
  expiresAt: Date;
  user: {
    id: UUID;
    phone: string;
    email: string;
    role: number;
    profile: IUserProfile | null;
    referralInfo: IReferralInfo | null;
  };
}

export interface IReferralInfo {
  wasReferred: boolean | null;
  message: string | null;
  referralCode: string;
  totalReferrals: string;
}

export interface ICreateProfileREQ {
  name: string;
  referralCode?: string;
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

export interface ICreateProfileRES {
  statusCode: number;
  message: string;
  data: ICreateProfileData;
}
export interface IAccountDetailsREQ {}

export interface IGetProfileRES {
  user: IUser;
  profile: IUserProfile;
  referralInfo: IReferralInfo;
}

export interface IGetProfileREQ {}

export interface IUser {
  phone: string;
  email: string | null;
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
export interface IAccountDetailsRES {
  user: IUser;
  profile: ICustomerProfile;
}

export interface ILogoutRES {}

export interface IAccountDeleteRES {}

export interface IAccountDeleteREQ {
  deleteTitle: string;
  deleteReason?: string;
}
