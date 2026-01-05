'use client';

import Icon from '@/components/shared/ui/icon';

import { useEffect, useState } from 'react';
import { useRouter } from 'nextjs-toploader/app';
import { ProfileIcon } from '@/components/shared/svg/svg-icon';
import { useAuthStore } from '@/stores/useAuth.store';

const NavProfile = () => {
  const router = useRouter();
  const [iconSize, setIconSize] = useState<'sm' | 'md'>('md');

  const signature = useAuthStore((s) => s.token);
  const setAuthModalOpen = useAuthStore((s) => s.setAuthModalOpen);

  useEffect(() => {
    const handleResize = () => {
      setIconSize(window.innerWidth < 350 ? 'sm' : 'md');
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleProfileClick = () => {
    if (signature) {
      const isMobile = window.innerWidth < 640;
      router.push(isMobile ? '/account' : '/account/profile');
    } else {
      setAuthModalOpen(true);
    }
  };

  return <Icon icon={ProfileIcon} onClick={handleProfileClick} size={iconSize} />;
};

export default NavProfile;
