'use client';

import { usePathname } from 'next/navigation';
import { useRouter } from 'nextjs-toploader/app';
import { useState, useCallback, useEffect, useMemo } from 'react';
import { normalizePath, getLastSegment } from '@/utils/route-utils';
import { useCategoriesStore } from '@/stores/useCategories.store';

import Section from '@/components/shared/ui/section';
import Container from '@/components/shared/ui/container';
import CategoryLayoutSkeleton from './category-layout-skeleton';
import CategorySidebar from './category-sidebar';
import CategoryHeader from './category-header';
import CategoryBreadcrumb from './category-breadcrumb';

interface CategoryLayoutProps {
  children: React.ReactNode;
}

const CategoryLayout = ({ children }: CategoryLayoutProps) => {
  const router = useRouter();
  const pathname = usePathname();

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isHydrated, setIsHydrated] = useState(false);
  const [sortBy, setSortBy] = useState('relevance');

  const { categories, isLoading, isInitialized, fetchCategories } = useCategoriesStore();

  const isCategoryRoot = useMemo(() => pathname === '/pc' || pathname === '/pc/', [pathname]);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 1024);
    checkMobile();

    const hydrationTimer = setTimeout(() => setIsHydrated(true), 50);
    window.addEventListener('resize', checkMobile);

    return () => {
      window.removeEventListener('resize', checkMobile);
      clearTimeout(hydrationTimer);
    };
  }, []);

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setIsSidebarOpen(false);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const closeSidebar = useCallback(() => setIsSidebarOpen(false), []);
  const openSidebar = useCallback(() => setIsSidebarOpen(true), []);

  const handleCategoryClick = useCallback(
    (path: string) => {
      router.push(path);
      closeSidebar();
    },
    [router, closeSidebar]
  );

  const handleSortChange = useCallback((value: string) => {
    setSortBy(value);
    console.log('Sort changed to:', value);
  }, []);

  const lastSegment = getLastSegment(pathname);
  const normalizedPathname = normalizePath(pathname);
  const showOnlySidebar = isCategoryRoot && isMobile;

  if (!isHydrated || (isLoading && !isInitialized)) {
    return <CategoryLayoutSkeleton />;
  }

  return (
    <Section className="py-4">
      <Container className="flex flex-col gap-0 overflow-hidden rounded border border-gray-200 bg-white">
        {/* Breadcrumb */}
        <CategoryBreadcrumb />

        {/* Main Content Area */}
        <div className="relative flex h-auto min-h-[70vh] w-full flex-col lg:h-[80vh] lg:flex-row">
          {/* Backdrop for mobile */}
          {isSidebarOpen && (
            <div
              className="fixed inset-0 z-20 bg-black/50 lg:hidden"
              onClick={closeSidebar}
              aria-label="Close sidebar"
            />
          )}

          {/* Sidebar */}
          <aside
            className={`${
              showOnlySidebar
                ? 'relative translate-x-0 opacity-100'
                : isSidebarOpen
                  ? 'translate-x-0 opacity-100'
                  : '-translate-x-full opacity-0 lg:translate-x-0 lg:opacity-100'
            } fixed inset-y-0 left-0 z-20 flex h-full w-full flex-col border-r border-gray-200 bg-white shadow-xl transition-all duration-300 ease-in-out lg:relative lg:z-auto lg:h-full lg:w-80 lg:max-w-80 lg:shadow-none`}
          >
            <CategorySidebar
              categories={categories}
              pathname={normalizedPathname}
              onCategoryClick={handleCategoryClick}
              onClose={closeSidebar}
              showCloseButton={!showOnlySidebar}
            />
          </aside>

          {/* Main Content */}
          {!showOnlySidebar && (
            <main className="flex min-h-0 min-w-0 flex-1 flex-col overflow-hidden">
              <div className="shrink-0">
                <CategoryHeader
                  title={lastSegment || 'Categories'}
                  onBack={() => {}}
                  onMenuClick={openSidebar}
                  showBackButton={false}
                  showMenuButton={isMobile}
                  onSortChange={handleSortChange}
                />
              </div>

              <div className="customScrollbar min-h-0 flex-1 overflow-y-auto">
                <div className="p-4 py-6">{children}</div>
              </div>
            </main>
          )}
        </div>
      </Container>
    </Section>
  );
};

export default CategoryLayout;
