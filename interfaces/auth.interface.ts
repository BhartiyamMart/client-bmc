import { UUID } from 'node:crypto';
import { IReferralInfo, IUserProfile } from './profile.interface';

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

export interface ILogoutRES {}

export interface IAccountDeleteREQ {
  deleteTitle: string;
  deleteReason?: string;
}

export interface IAccountDeleteRES {}
