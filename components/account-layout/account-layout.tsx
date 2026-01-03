'use client';

import toast from 'react-hot-toast';

import { usePathname } from 'next/navigation';
import { MenuItem } from '@/data/account-menu';
import { useRouter } from 'nextjs-toploader/app';
import { useState, useCallback, useEffect } from 'react';
import { normalizePath, getLastSegment, getOrderIdFromPath } from '@/utils/route-utils';
import { useAuthStore, useUserImage, useUserProfile } from '@/stores/useAuth.store';
import SidebarProfile from '@/components/account-layout/sidebar-profile';
import SidebarMenu from '@/components/account-layout/sidebar-menu';
import AccountHeader from '@/components/account-layout/account-header';
import LogoutDialog from '@/components/account-layout/logout-dialog';
import { logout } from '@/apis/auth.api';
import Section from '../shared/ui/section';
import Container from '../shared/ui/container';

interface AccountLayoutProps {
  children: React.ReactNode;
}

const AccountLayout = ({ children }: AccountLayoutProps) => {
  const pathname = usePathname();
  const router = useRouter();

  // ✅ Local sidebar state (not persisted)
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isLogoutOpen, setIsLogoutOpen] = useState(false);

  // ✅ Use consolidated auth store
  const userProfile = useUserProfile();
  const userImage = useUserImage();
  const { logout: logoutStore, setProtectedRoute } = useAuthStore();

  // User data
  const phoneNumber = userProfile?.phoneNumber || '';
  const fullName = userProfile?.firstName || '';

  // ✅ Auto-close sidebar on desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsSidebarOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Handle logout
  const handleLogout = useCallback(async () => {
    try {
      const response = await logout();

      if (response.status === 200) {
        logoutStore();
        localStorage.clear();

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
    (item: MenuItem) => {
      if (item.name === 'Logout') {
        setIsLogoutOpen(true);
      }
      closeSidebar();
    },
    [closeSidebar]
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

  return (
    <Section className="">
      <Container className="relative flex rounded border bg-white">
        {/* Mobile Overlay */}
        {isSidebarOpen && (
          <div className="fixed inset-0 z-40 bg-black/50 md:hidden" onClick={closeSidebar} aria-label="Close sidebar" />
        )}

        {/* Sidebar */}
        <aside
          className={`${
            isSidebarOpen ? 'translate-x-0 opacity-100' : '-translate-x-full opacity-0'
          } fixed top-0 left-0 z-50 flex h-screen w-full flex-col border-r bg-white shadow-xl transition-all duration-300 ease-in-out md:sticky md:top-20 md:z-auto md:h-[calc(100vh-80px)] md:w-64 md:translate-x-0 md:opacity-100 md:shadow-none`}
        >
          {/* Profile Section */}
          <SidebarProfile
            fullName={fullName}
            phoneNumber={phoneNumber}
            profileImage={userImage}
            onClose={closeSidebar}
          />

          {/* Navigation */}
          <SidebarMenu pathname={normalizedPathname} onItemClick={handleMenuItemClick} />
        </aside>

        {/* Main Content */}
        <main className="flex min-h-[calc(100vh-100px)] min-w-0 flex-1 flex-col overflow-y-auto md:h-[calc(100vh-80px)]">
          {/* Header */}
          <AccountHeader title={lastSegment || 'Account'} onBack={handleBack} />

          {/* Page Content */}
          <div className="flex-1 p-4 md:p-6">{children}</div>
        </main>

        {/* Logout Dialog */}
        <LogoutDialog isOpen={isLogoutOpen} onClose={() => setIsLogoutOpen(false)} onConfirm={handleLogout} />
      </Container>
    </Section>
  );
};

export default AccountLayout;
