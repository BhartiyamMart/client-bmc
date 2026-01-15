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
import { useWalletStore } from '@/stores/useWallet.store';
import { accountDetails } from '@/apis/profile.api';

interface AccountLayoutProps {
  children: React.ReactNode;
}

const AccountLayout = ({ children }: AccountLayoutProps) => {
  const router = useRouter();
  const pathname = usePathname();

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isLogoutOpen, setIsLogoutOpen] = useState(false);
  const [isLoadingDetails, setIsLoadingDetails] = useState(false);
  const wallet = useWalletStore((state) => state.amount);
  const setWallet = useWalletStore((state) => state.setAmount);
  const userImage = useUserImage();
  const userProfile = useUserProfile();
  const userPhone = usePhone();
  const { logout: logoutStore, setProtectedRoute } = useAuthStore();

  const fullName = userProfile?.name || '';
  const phone = userPhone || '';

  // Check if we're on the base /account route
  const isAccountRoot = pathname === '/account';
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 640;

  // Auto-redirect on desktop if on /account
  useEffect(() => {
    if (isAccountRoot && !isMobile) {
      router.replace('/account/profile');
    }
  }, [isAccountRoot, isMobile, router]);

  // Auto-close sidebar on desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
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

    setIsLoadingDetails(true);
    try {
      const response = await accountDetails();

      if (response.status === 200) {
        // Successfully fetched account details
        // You can dispatch this to your store or state management if needed
        setWallet(response.payload.wallet.amount);
      } else {
        toast.error(response.message || 'Failed to fetch account details');
      }
    } catch (error) {
      console.error('Account details error:', error);
      toast.error('Error fetching account details');
    } finally {
      setIsLoadingDetails(false);
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
      console.error('Logout error:', error);
      toast.error('Something went wrong. Please try again.');
    }
  }, [logoutStore, router, setProtectedRoute]);

  // Sidebar handlers
  const closeSidebar = useCallback(() => setIsSidebarOpen(false), []);
  const openSidebar = useCallback(() => setIsSidebarOpen(true), []);

  const handleMenuItemClick = useCallback(
    (item: IMenuItem) => {
      // Call handleChange to fetch account details
      handleChange(item);

      if (item.name === 'Logout') {
        setIsLogoutOpen(true);
      }
      closeSidebar();
    },
    [handleChange, closeSidebar]
  );

  // Navigation helpers
  const handleBack = useCallback(() => {
    if (window.history.length > 1) {
      router.back();
    } else {
      router.push('/account');
    }
  }, [router]);

  const lastSegment = getLastSegment(pathname);
  const normalizedPathname = normalizePath(pathname);

  const showOnlySidebar = isAccountRoot && isMobile;

  return (
    <Section className="">
      <Container className="relative flex overflow-hidden rounded border bg-white">
        {/* Mobile Overlay */}
        {isSidebarOpen && (
          <div className="fixed inset-0 z-40 bg-black/50 md:hidden" onClick={closeSidebar} aria-label="Close sidebar" />
        )}

        {/* Sidebar */}
        <aside
          className={`${
            showOnlySidebar
              ? 'relative w-full'
              : isSidebarOpen
                ? 'translate-x-0 opacity-100'
                : '-translate-x-full opacity-0'
          } ${
            showOnlySidebar ? 'flex h-auto' : 'fixed top-0 left-0 z-50 flex h-screen w-full'
          } w-full max-w-80 flex-col border-r bg-white shadow-sm transition-all duration-300 ease-in-out md:sticky md:top-20 md:z-auto md:h-auto md:max-h-[calc(100vh-80px)] md:translate-x-0 md:opacity-100 md:shadow-none`}
        >
          {/* Profile Section */}
          <SidebarProfile
            fullName={fullName}
            phone={phone}
            profileImage={userImage}
            onClose={showOnlySidebar ? () => {} : closeSidebar}
          />

          <SidebarWallet amount={wallet} />

          {/* Navigation */}
          <SidebarMenu pathname={normalizedPathname} onItemClick={handleMenuItemClick} />
        </aside>

        {/* Main Content - Hidden on /account for mobile */}
        {!showOnlySidebar && (
          <main className="flex min-h-[70vh] min-w-0 flex-1 flex-col overflow-y-auto md:h-auto md:max-h-[calc(100vh-80px)]">
            {/* Header */}
            <AccountHeader title={lastSegment || 'Account'} onBack={handleBack} />

            {/* Page Content */}
            <div className="flex-1 p-4 py-6">{children}</div>
          </main>
        )}

        {/* Logout Dialog */}
        <LogoutDialog isOpen={isLogoutOpen} onClose={() => setIsLogoutOpen(false)} onConfirm={handleLogout} />
      </Container>
    </Section>
  );
};

export default AccountLayout;
