'use client';

import toast from 'react-hot-toast';
import { useEffect, useRef } from 'react';
import { accountDetails } from '@/apis/profile.api';
import { useWalletStore } from '@/stores/useWallet.store';
import { useAuthStore } from '@/stores/useAuth.store';

const AccountBootstrap = () => {
  const setWallet = useWalletStore((state) => state.setBalance);
  const setHasWallet = useWalletStore((state) => state.setHasWallet);
  const setWalletTerms = useWalletStore((state) => state.setWalletTerms);
  const setWalletChecked = useWalletStore((state) => state.setWalletChecked);
  const setUserPhone = useWalletStore((state) => state.setUserPhone);
  const resetWallet = useWalletStore((state) => state.resetWallet);
  const setAutoMail = useAuthStore((state) => state.setAutomail);
  const storedUserPhone = useWalletStore((state) => state.userPhone);
  const currentUserPhone = useAuthStore((state) => state.phone);

  const hasBootstrapped = useRef(false);

  useEffect(() => {
    const getAccountDetails = async () => {
      if (hasBootstrapped.current) return;
      hasBootstrapped.current = true;
      if (storedUserPhone && storedUserPhone !== currentUserPhone) {
        resetWallet();
      }
      try {
        const response = await accountDetails();
        if (response.status === 200) {
          const walletData = response.payload.wallet;
          setWallet(walletData.balance);
          setHasWallet(walletData.hasWallet);
          setWalletTerms(walletData.walletTerms || []);
          setWalletChecked(true);
          setUserPhone(currentUserPhone || '');
          setAutoMail(response.payload.user.autoMail);
        }
      } catch (error) {
        resetWallet();
      }
    };

    getAccountDetails();
  }, [currentUserPhone]);

  return null;
};

export default AccountBootstrap;
