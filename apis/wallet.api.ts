import { ApiResponse } from '@/interfaces/api.interface';
import { requestAPI } from '@/lib/axios';
import * as IWallet from '@/interfaces/wallet.interface';

export const getWallet = async () => {
  return requestAPI<ApiResponse<IWallet.IGetWalletRES>, IWallet.IGetWalletREQ>(
    'get',
    'v1',
    'wallet/customer',
    'get-user-wallet'
  );
};

export const reChargeWallet = async (data: IWallet.IRechargeWalletREQ) => {
  return requestAPI<ApiResponse<IWallet.IRechargeWalletRES>, IWallet.IRechargeWalletREQ>(
    'post',
    'v1',
    'wallet/customer',
    'recharge/create-order',
    data
  );
};

export const verifyReChargeWallet = async (data: IWallet.IVerifyRechargeWalletREQ) => {
  return requestAPI<ApiResponse<IWallet.IVerifyRechargeWalletRES>, IWallet.IVerifyRechargeWalletREQ>(
    'post',
    'v1',
    'wallet/customer',
    'recharge/verify-payment',
    data
  );
};

export const getWalletTransaction = async (data: IWallet.IWalletTransactionREQ) => {
  return requestAPI<ApiResponse<IWallet.IWalletTransactionRES>, IWallet.IWalletTransactionREQ>(
    'post',
    'v1',
    'wallet/customer',
    'get-wallet-transactions',
    data
  );
};


