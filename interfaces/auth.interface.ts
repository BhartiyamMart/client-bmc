import { UUID } from "node:crypto";

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

export interface UserProfile {
  name: string;
  photo?: string | null;
  dateOfBirth?: string | null;
  gender?: string | null;
}

export interface IVerifyOtpRES {
  token: string;
  expiresAt: Date;
  user: {
    id: UUID,
    phone: string,
    email: string,
    role: number,
    profile: UserProfile | null,
  };
}

export interface ICreateProfileREQ {
  firstName: string;
  referralCode?: string;
}

export interface ICreateProfileRES {
  id: string;
  userId?: string;
  firstName: string;
  middleName: string;
  lastName: string;
  dateOfBirth: null;
  gender: string;
  profileImageUrl: string;
}

export interface ILogoutRES {}
