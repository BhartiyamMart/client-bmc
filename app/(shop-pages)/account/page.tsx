'use client';

import { useEffect } from 'react';
import { useRouter } from 'nextjs-toploader/app';

const AccountPage = () => {
  const router = useRouter();
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        router.replace('/account/profile');
      }
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [router]);
  return null;
};

export default AccountPage;
