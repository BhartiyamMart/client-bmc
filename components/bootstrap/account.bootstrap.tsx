'use client';
import { accountDetails } from '@/apis/profile.api';
import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { useWalletStore } from '@/stores/useWallet.store';
import { useAuthStore } from '@/stores/useAuth.store';
import { useRouter } from 'nextjs-toploader/app';

const AccountDetails = () => {
  const wallet = useWalletStore((state) => state.amount);
  const setWallet = useWalletStore((state) => state.setAmount);
  const token = useAuthStore((state) => state.token);
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkTokenAndFetch = async () => {
      // If no token, redirect immediately
      if (!token) {
        router.push('/');
        return;
      }

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
      } finally {
        setIsLoading(false);
      }
    };

    checkTokenAndFetch();
  }, [token, router, setWallet]);

  // Show nothing while checking/loading
  if (isLoading) {
    return null;
  }

  return null;
};

export default AccountDetails;
