'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'nextjs-toploader/app';
import { useAuthStore } from '@/stores/useAuth.store';
import { IPageLayoutProps } from '@/interfaces/shared.interface';

const ProtectedRoute = ({ children }: IPageLayoutProps) => {
  const router = useRouter();
  const token = useAuthStore((state) => state.token);
  const [isHydrated, setIsHydrated] = useState(false);

  // Wait for Zustand to hydrate from localStorage
  useEffect(() => {
    setIsHydrated(true);
  }, []);

  // Redirect after hydration is complete
  useEffect(() => {
    if (isHydrated && !token) {
      router.push('/');
    }
  }, [isHydrated, token, router]);

  // Don't render anything until hydration is complete
  if (!isHydrated) {
    return null;
  }

  // If token exists after hydration, render children
  if (token) {
    return <>{children}</>;
  }

  // If no token after hydration, render nothing (redirect will happen)
  return null;
};

export default ProtectedRoute;
