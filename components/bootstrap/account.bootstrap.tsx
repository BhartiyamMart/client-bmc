'use client';

import toast from 'react-hot-toast';

import { useEffect } from 'react';
import { useRouter } from 'nextjs-toploader/app';
import { accountDetails } from '@/apis/profile.api';
import { useWalletStore } from '@/stores/useWallet.store';

const AccountBootstrap = () => {
  const router = useRouter();
  const setWallet = useWalletStore((state) => state.setAmount);

  useEffect(() => {
    const getAccountDetails = async () => {
      try {
        const response = await accountDetails();
        if (response.status === 200) {
          setWallet(response.payload.wallet.amount);
        } else {
          toast.error(response.message || 'Failed to fetch account details');
        }
      } catch (error) {
        console.error('Account details error:', error);
        toast.error('Error fetching account details');
      }
    };
    getAccountDetails();
  }, [router, setWallet]);

  return null;
};

export default AccountBootstrap;
