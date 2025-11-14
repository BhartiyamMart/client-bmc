'use client';

import Link from 'next/link';
import Icon from '@/components/shared/icon';

import { useCallback } from 'react';
import { useAuthStore } from '@/stores/useAuth.store';
import { WalletIcon } from '@/components/shared/svg-icon';
import toast from 'react-hot-toast';

const NavWallet = () => {
  const token = useAuthStore((state) => state.token);
  const setAuthModalOpen = useAuthStore((state) => state.setAuthModalOpen);
  const setProtectedRoute = useAuthStore((state) => state.setProtectedRoute);

  const handleUnauthenticatedClick = useCallback(
    (e: React.MouseEvent) => {
      e.preventDefault();
      toast.error('Please login to continue');
      setProtectedRoute('/account/wallet');
      setAuthModalOpen(true);
    },
    [setProtectedRoute, setAuthModalOpen]
  );

  if (token) {
    return (
      <Link href="/account/wallet" className="hidden md:block">
        <Icon icon={WalletIcon} as="div" />
      </Link>
    );
  }

  return (
    <button
      className="hidden cursor-pointer md:block"
      onClick={handleUnauthenticatedClick}
      aria-label="Open wallet (requires login)"
    >
      <Icon icon={WalletIcon} as="div" />
    </button>
  );
};

export default NavWallet;
