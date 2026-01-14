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
  referralCode: string;
  totalReferrals: string;
}

export interface IUserProfile {
  name: string;
  photo?: string | null;
  dateOfBirth?: string | null;
  gender?: string | null;
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
export interface ICreateProfileREQ {
  name: string;
  referralCode?: string;
}

export interface ICreateProfileRES {
  statusCode: number;
  message: string;
  data: ICreateProfileData;
}
export interface IAccountDetailsRES {}

export interface ILogoutRES {}

export interface IReferralREQ {}
export interface IReferralRES {
  referralCode: string;
}
