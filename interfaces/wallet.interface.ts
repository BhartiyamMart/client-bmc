export interface IWalletData {
  balance: number;
  lockedBalance: number;
  availableBalance: number;
  lifetimeEarned: number;
  lifetimeSpent: number;
  maxBalance: number;
  status: boolean;
  isFrozen: boolean;
  frozenReason: string | null;
  lastCreditAt: string | null;
  lastDebitAt: string | null;
  pendingTransactions: number;
}

export interface IRazorpayData {
  orderId: string;
  amount: number;
  currency: string;
  key: string;
}

export interface IGetWalletREQ {}

export interface IGetWalletRES {
  wallet: IWalletData;
  recentTransactions: [];
}

export interface IRechargeWalletREQ {
  amount: number;
}

export interface IRechargeWalletRES {
  razorpay: IRazorpayData;
}

export interface IVerifyRechargeWalletRES {}

export interface IVerifyRechargeWalletREQ {
  razorpayOrderId: string;
  razorpayPaymentId: string;
  razorpaySignature: string;
}

export interface IWalletTransactionREQ {
  page: string;
  limit: string;
}
export interface IWalletTransactionRES {
  transactions: ITransactionData[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
    hasNext: boolean;
    hasPrev: boolean;
  };
  currentBalance: number;
}

export interface ITransactionData {
  id: string;
  userId: string;
  type: string;
  source: string;
  status: string;
  amount: number;
  balanceBefore: number;
  balanceAfter: number;
  orderId: string | null;
  referralId: string | null;
  title: string;
  description: string;
  metadata: {
    completedAt?: string;
    initiatedAt?: string;
    paymentEmail?: string;
    paymentMethod?: string;
    paymentContact?: string;
    razorpayAmount?: number;
    razorpayOrderId?: string;
    razorpayCurrency?: string;
    razorpayPaymentId?: string;
    razorpaySignature?: string;
  };
  expiresAt: string | null;
  isExpired: boolean;
  failureReason: string | null;
  completedAt: string | null;
  createdAt: string;
}