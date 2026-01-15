'use client';

import { useAuthStore } from '@/stores/useAuth.store';
import { useRouter } from 'nextjs-toploader/app';
import { useEffect, useState } from 'react';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const token = useAuthStore((state) => state.token);
  const router = useRouter();
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
