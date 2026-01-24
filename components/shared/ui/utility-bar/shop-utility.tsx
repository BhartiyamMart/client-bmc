'use client';

import { usePathname } from 'next/navigation';
import { useState, useRef, useEffect, forwardRef } from 'react';
import { AnimatePresence } from 'framer-motion'; // Add this import

import Container from '@/components/shared/ui/container';
import ShopByCategory from '@/components/shared/ui/utility-bar/shop-by-category';
import CategoryItem from '@/components/shared/ui/utility-bar/category-item';
import MembershipButton from '@/components/shared/ui/utility-bar/membership-button';
import CategorySidebar from '@/components/shared/ui/utility-bar/category-sidebar';

const CATEGORIES = [
  { name: 'Fruits & Vegetables', icon: '/temp/a.png' },
  { name: 'Kitchen Appliance', icon: '/temp/b.png' },
  { name: 'Special Offers', icon: '/temp/c.png' },
  { name: 'Brands', icon: '/temp/d.png' },
] as const;

interface ShopUtilityProps {
  navbarRef?: React.RefObject<HTMLElement | null>;
}

const ShopUtility = forwardRef<HTMLDivElement, ShopUtilityProps>(({ navbarRef }, ref) => {
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [sidebarPosition, setSidebarPosition] = useState({ top: 0, left: 0 });
  const [isPositionSet, setIsPositionSet] = useState(false);
  const [navbarHeight, setNavbarHeight] = useState(90);
  const buttonRef = useRef<HTMLDivElement>(null);
  const sidebarRef = useRef<HTMLDivElement>(null);

  // Calculate navbar height dynamically
  useEffect(() => {
    const updateNavbarHeight = () => {
      if (navbarRef?.current) {
        const height = navbarRef.current.offsetHeight;
        setNavbarHeight(height);
      }
    };

    updateNavbarHeight();
    window.addEventListener('resize', updateNavbarHeight);

    if (document.fonts) {
      document.fonts.ready.then(updateNavbarHeight);
    }

    return () => window.removeEventListener('resize', updateNavbarHeight);
  }, [navbarRef]);

  useEffect(() => {
    if (!sidebarOpen) return;

    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node;
      if (
        sidebarRef.current &&
        !sidebarRef.current.contains(target) &&
        buttonRef.current &&
        !buttonRef.current.contains(target)
      ) {
        setSidebarOpen(false);
        setIsPositionSet(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [sidebarOpen]);

  useEffect(() => {
    if (!sidebarOpen) {
      setIsPositionSet(false);
      return;
    }

    if (buttonRef.current) {
      const rect = buttonRef.current.getBoundingClientRect();
      setSidebarPosition({ top: rect.bottom, left: rect.left });
      setIsPositionSet(true);
    }

    const updatePosition = () => {
      if (buttonRef.current) {
        const rect = buttonRef.current.getBoundingClientRect();
        setSidebarPosition({ top: rect.bottom, left: rect.left });
      }
    };

    window.addEventListener('resize', updatePosition);
    window.addEventListener('scroll', updatePosition, true);

    return () => {
      window.removeEventListener('resize', updatePosition);
      window.removeEventListener('scroll', updatePosition, true);
    };
  }, [sidebarOpen]);

  return (
    <>
      {/* Backdrop Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/40"
          onClick={() => {
            setSidebarOpen(false);
            setIsPositionSet(false);
          }}
        />
      )}

      {/* Navigation Bar - Dynamic top position */}
      <nav
        ref={ref}
        className="sticky z-30 hidden w-full items-center justify-center bg-white p-3 shadow-sm md:p-4 lg:flex lg:p-5"
        style={{ top: `${navbarHeight}px` }}
      >
        <Container className="flex items-center gap-2.5">
          <div ref={buttonRef} className="relative z-50">
            <ShopByCategory isOpen={sidebarOpen} onToggle={setSidebarOpen} />
          </div>

          <div className="scrollbar-hide flex flex-1 gap-2.5 overflow-x-auto">
            {CATEGORIES.map((category) => (
              <CategoryItem key={category.name} name={category.name} icon={category.icon} />
            ))}
          </div>

          <MembershipButton />
        </Container>
      </nav>

      {/* Category Sidebar - Wrapped with AnimatePresence */}
      <AnimatePresence>
        {sidebarOpen && isPositionSet && (
          <div ref={sidebarRef}>
            <CategorySidebar
              position={sidebarPosition}
              onClose={() => {
                setSidebarOpen(false);
                setIsPositionSet(false);
              }}
            />
          </div>
        )}
      </AnimatePresence>
    </>
  );
});

ShopUtility.displayName = 'ShopUtility';

export default ShopUtility;
