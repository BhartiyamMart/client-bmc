'use client';

import { logout } from '@/apis/auth.api';
import { usePathname } from 'next/navigation';
import { useRouter } from 'nextjs-toploader/app';
import { useState, useCallback, useEffect } from 'react';
import { IMenuItem } from '@/interfaces/shared.interface';
import { normalizePath, getLastSegment } from '@/utils/route-utils';
import { useAuthStore, usePhone, useUserImage, useUserProfile } from '@/stores/useAuth.store';

import toast from 'react-hot-toast';
import Section from '@/components/shared/ui/section';
import Container from '@/components/shared/ui/container';
import SidebarMenu from '@/components/account-layout/sidebar-menu';
import LogoutDialog from '@/components/account-layout/logout-dialog';
import AccountHeader from '@/components/account-layout/account-header';
import SidebarProfile from '@/components/account-layout/sidebar-profile';
import SidebarWallet from './sidebar-wallet';
import { accountDetails } from '@/apis/profile.api';
import AccountLayoutSkeleton from './account-layout-skeleton';

interface AccountLayoutProps {
  children: React.ReactNode;
}

const AccountLayout = ({ children }: AccountLayoutProps) => {
  const router = useRouter();
  const pathname = usePathname();

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isLogoutOpen, setIsLogoutOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isHydrated, setIsHydrated] = useState(false);

  const userImage = useUserImage();
  const userProfile = useUserProfile();
  const userPhone = usePhone();
  const { logout: logoutStore, setProtectedRoute } = useAuthStore();

  const fullName = userProfile?.name || '';
  const phone = userPhone || '';

  const isAccountRoot = pathname === '/account';

  // Hydration phase
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024);
    };
    checkMobile();
    const hydrationTimer = setTimeout(() => {
      setIsHydrated(true);
    }, 50);
    window.addEventListener('resize', checkMobile);
    return () => {
      window.removeEventListener('resize', checkMobile);
      clearTimeout(hydrationTimer);
    };
  }, []);

  // Auto-close sidebar on desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setIsSidebarOpen(false);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Fetch account details
  const handleChange = useCallback(async (item: IMenuItem) => {
    if (item.name === 'Logout') {
      return;
    }
    try {
      const response = await accountDetails();
      if (response.status !== 200) {
        toast.error(response.message || 'Failed to fetch account details');
      }
    } catch (error) {
      toast.error('Error fetching account details');
    }
  }, []);

  // Handle logout
  const handleLogout = useCallback(async () => {
    try {
      const response = await logout();
      if (response.status === 200) {
        logoutStore();
        localStorage.removeItem('auth-storage');
        setTimeout(() => {
          setIsLogoutOpen(false);
          toast.success(response.message);
          router.push('/');
          setProtectedRoute(null);
        }, 1000);
      } else {
        toast.error(response.message);
      }
    } catch (error) {
      toast.error('Something went wrong. Please try again.');
    }
  }, [logoutStore, router, setProtectedRoute]);

  const closeSidebar = useCallback(() => setIsSidebarOpen(false), []);
  const handleMenuItemClick = useCallback(
    (item: IMenuItem) => {
      handleChange(item);
      if (item.name === 'Logout') {
        setIsLogoutOpen(true);
      }
      closeSidebar();
    },
    [handleChange, closeSidebar]
  );

  // Custom back handler based on screen size
  const handleBackClick = useCallback(() => {
    if (isMobile) {
      router.push('/account', { scroll: false });
    } else {
      router.back();
    }
  }, [isMobile, router]);

  const lastSegment = getLastSegment(pathname);
  const normalizedPathname = normalizePath(pathname);
  const showOnlySidebar = isAccountRoot && isMobile;

  // Show skeleton until hydrated
  if (!isHydrated) {
    return <AccountLayoutSkeleton />;
  }

  return (
    <Section className="py-4">
      <Container className="relative flex h-auto w-full flex-col overflow-hidden rounded border bg-white lg:h-125 lg:min-h-125 lg:flex-row">
        {isSidebarOpen && (
          <div className="fixed inset-0 z-20 bg-black/50 lg:hidden" onClick={closeSidebar} aria-label="Close sidebar" />
        )}
        <aside
          className={`${
            showOnlySidebar
              ? 'relative translate-x-0 opacity-100'
              : isSidebarOpen
                ? 'translate-x-0 opacity-100'
                : '-translate-x-full opacity-0 lg:translate-x-0 lg:opacity-100'
          } fixed inset-y-0 left-0 z-20 flex h-full w-full flex-col border-r bg-white shadow-lg transition-all duration-300 ease-in-out lg:relative lg:z-auto lg:h-full lg:w-80 lg:max-w-80 lg:shadow-none`}
        >
          <div className="shrink-0">
            <SidebarProfile
              fullName={fullName}
              phone={phone}
              profileImage={userImage}
              onClose={showOnlySidebar ? () => {} : closeSidebar}
            />
          </div>
          <div className="shrink-0">
            <SidebarWallet />
          </div>
          <div className="lg:customScrollbarLeft min-h-0 flex-1 overflow-y-auto pb-4">
            <SidebarMenu pathname={normalizedPathname} onItemClick={handleMenuItemClick} />
          </div>
        </aside>
        {!showOnlySidebar && (
          <main className="flex min-h-0 min-w-0 flex-1 flex-col overflow-hidden">
            <div className="shrink-0">
              <AccountHeader
                title={lastSegment || 'Account'}
                onBack={handleBackClick}
                showBackButton={!isAccountRoot || !isMobile}
              />
            </div>
            <div className="lg:customScrollbar min-h-0 flex-1 overflow-y-auto">
              <div className="p-4 py-6">{children}</div>
            </div>
          </main>
        )}
        <LogoutDialog isOpen={isLogoutOpen} onClose={() => setIsLogoutOpen(false)} onConfirm={handleLogout} />
      </Container>
    </Section>
  );
};

export default AccountLayout;
