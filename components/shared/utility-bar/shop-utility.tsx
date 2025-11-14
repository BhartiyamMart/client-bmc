'use client';

import { usePathname } from 'next/navigation';
import { useState, useRef, useEffect } from 'react';
import CategoryItem from '@/components/shared/utility-bar/category-item';
import ShopByCategory from '@/components/shared/utility-bar/shop-by-category';
import CategorySidebar from '@/components/shared/utility-bar/category-sidebar';
import MembershipButton from '@/components/shared/utility-bar/membership-button';
import Container from '../container';

const CATEGORIES = [
  { name: 'Fruits & Vegetables', icon: '/temp/a.png' },
  { name: 'Kitchen Appliance', icon: '/temp/b.png' },
  { name: 'Special Offers', icon: '/temp/c.png' },
  { name: 'Brands', icon: '/temp/d.png' },
] as const;

const ShopUtility = () => {
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [sidebarPosition, setSidebarPosition] = useState({ top: 0, left: 0 });
  const [isPositionSet, setIsPositionSet] = useState(false);
  const buttonRef = useRef<HTMLDivElement>(null);
  const sidebarRef = useRef<HTMLDivElement>(null);

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

  if (pathname !== '/') return null;

  return (
    <>
      {/* Backdrop Overlay - z-40 */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/40"
          onClick={() => {
            setSidebarOpen(false);
            setIsPositionSet(false);
          }}
        />
      )}

      {/* Navigation Bar - z-50 to stay above backdrop */}
      <nav className="sticky top-[90px] z-30 hidden w-full items-center justify-center bg-white shadow-sm md:flex">
        <Container className="flex items-center gap-2.5 p-3 md:px-4 lg:px-5">
          {/* Shop by Category Button - z-50 with relative positioning */}
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

      {/* Category Sidebar - z-50 to be above backdrop */}
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
    </>
  );
};

export default ShopUtility;
