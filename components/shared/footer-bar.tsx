'use client';

import { usePathname, useRouter } from 'next/navigation';
import { useMemo, useCallback } from 'react';
import {
  SaveItemsBottomNavIcon,
  ExploreBottomNavIcon,
  HomeBottomNavIcon,
  WalletBottomNavIcon,
} from '@/components/shared/svg-icon';
import Section from './section';
import Container from './container';

// Types
type TabId = 'shop' | 'explore' | 'saveItems' | 'wallet';

interface Tab {
  id: TabId;
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  url: string;
  ariaLabel: string;
}

// Constants
const TABS: readonly Tab[] = [
  {
    id: 'shop',
    icon: HomeBottomNavIcon,
    label: 'Shop',
    url: '/',
    ariaLabel: 'Navigate to shop',
  },
  {
    id: 'explore',
    icon: ExploreBottomNavIcon,
    label: 'Explore',
    url: '/search',
    ariaLabel: 'Navigate to explore',
  },
  {
    id: 'saveItems',
    icon: SaveItemsBottomNavIcon,
    label: 'Saved',
    url: '/account/saveitems',
    ariaLabel: 'Navigate to saved items',
  },
  {
    id: 'wallet',
    icon: WalletBottomNavIcon,
    label: 'Wallet',
    url: '/account/wallet',
    ariaLabel: 'Navigate to wallet',
  },
] as const;

// Route mapping for active tab detection
const ROUTE_TO_TAB_MAP: Record<string, TabId> = {
  '/': 'shop',
  '/search': 'explore',
  '/account/wallet': 'wallet',
  '/account/saveitems': 'saveItems',
  '/favorites': 'saveItems',
};

const FooterBar = () => {
  const pathname = usePathname();
  const router = useRouter();

  // Memoize active tab calculation
  const activeTab = useMemo((): TabId => {
    // Exact match first
    if (ROUTE_TO_TAB_MAP[pathname]) {
      return ROUTE_TO_TAB_MAP[pathname];
    }

    // Prefix match for nested routes
    const matchedRoute = Object.keys(ROUTE_TO_TAB_MAP).find((route) => route !== '/' && pathname.startsWith(route));

    return matchedRoute ? ROUTE_TO_TAB_MAP[matchedRoute] : 'shop';
  }, [pathname]);

  // Memoize navigation handler
  const handleNavigation = useCallback(
    (url: string) => {
      router.push(url);
    },
    [router]
  );

  return (
    <Section className="fixed bottom-0 z-30 lg:hidden">
      <Container className="pb-safe xs:px-3 bg-transparent px-2 sm:px-4">
        <nav
          role="navigation"
          aria-label="Bottom navigation"
          className="xs:mb-2 xs:p-1.5 mb-1.5 rounded-full border border-gray-100 bg-white/95 p-1 shadow-[0px_0px_2px_0px_#00000040] sm:p-2"
        >
          <div className="xs:gap-1 flex items-stretch justify-around gap-0.5">
            {TABS.map((tab) => {
              const IconComponent = tab.icon;
              const isActive = activeTab === tab.id;

              return (
                <button
                  key={tab.id}
                  onClick={() => handleNavigation(tab.url)}
                  aria-label={tab.ariaLabel}
                  aria-current={isActive ? 'page' : undefined}
                  className={`group xs:gap-1 xs:px-3 xs:py-2 relative flex flex-1 cursor-pointer flex-col items-center justify-center gap-0.5 rounded-full px-2 py-1.5 transition-all duration-300 active:scale-95 sm:flex-row sm:gap-2 sm:px-4 sm:py-2.5 md:py-3 ${
                    isActive
                      ? 'bg-orange-500 text-white shadow-sm hover:bg-orange-600'
                      : 'bg-transparent text-gray-600 hover:bg-orange-50 hover:text-orange-600'
                  }`}
                  style={{
                    minHeight: '48px',
                    minWidth: '52px',
                  }}
                >
                  {/* Icon Container - Responsive sizing */}
                  <div className="xs:h-5.5 xs:w-5.5 flex h-5 w-5 shrink-0 items-center justify-center sm:h-6 sm:w-6">
                    <IconComponent
                      className={`h-full w-full transition-all duration-200 ${isActive ? 'brightness-0 invert' : ''}`}
                    />
                  </div>

                  {/* Label - Responsive text sizing */}
                  <span
                    className={`xs:text-[12px] text-[10px] leading-tight font-medium transition-all duration-200 sm:text-[13px] md:text-[14px] ${
                      isActive ? 'opacity-100' : 'opacity-90'
                    }`}
                  >
                    {tab.label}
                  </span>
                </button>
              );
            })}
          </div>
        </nav>
      </Container>
    </Section>
  );
};

export default FooterBar;
