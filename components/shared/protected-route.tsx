'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'nextjs-toploader/app';
import { useAuthStore } from '@/stores/useAuth.store';
import { IPageLayoutProps } from '@/interfaces/shared.interface';

const ProtectedRoute = ({ children }: IPageLayoutProps) => {
  const router = useRouter();
  const token = useAuthStore((state) => state.token);

  const [isAuthorized, setIsAuthorized] = useState(false);

  useEffect(() => {
    if (!token) {
      router.push('/');
    } else {
      setIsAuthorized(true);
    }
  }, [token, router]);

  if (!isAuthorized) {
    return null;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
