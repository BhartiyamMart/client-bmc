export interface IOtpREQ {
  phoneNumber: string;
}

export interface IOtpRES {
  otp: string;
}

export interface IVerifyOtpREQ {
  phoneNumber: string;
  otp: string;
  deviceInfo: {
    deviceType: string;
  };
}

export interface IVerifyOtpRES {
  token: string;
  isName: boolean;
  profile: {
    phoneNumber: string;
    email?: string | null;
    firstName?: string | null;
    middleName?: string | null;
    lastName?: string | null;
    dateOfBirth?: string | null;
    profilePicture?: string | null;
    gender?: string | null;
    rewardCoins?: number;
    totalOrders?: number;
    totalSpent?: string;
    preferredPaymentMethod?: string;
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
