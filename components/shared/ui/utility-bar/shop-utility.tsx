'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState, useRef, useEffect, forwardRef } from 'react';
import Container from '@/components/shared/ui/container';
import ShopByCategory from '@/components/shared/ui/utility-bar/shop-by-category';
import CategoryItem from '@/components/shared/ui/utility-bar/category-item';
import CategorySidebar from '@/components/shared/ui/utility-bar/category-sidebar';
import { useContentStore } from '@/stores/useContent.store';
import { fetchAllCategories } from '@/apis/content.api';
import ShopUtilitySkeleton from './shop-utility-skelton';

interface ShopUtilityProps {
  navbarRef?: React.RefObject<HTMLElement | null>;
}

const ShopUtility = forwardRef<HTMLDivElement, ShopUtilityProps>(({ navbarRef }, ref) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [sidebarPosition, setSidebarPosition] = useState({ top: 0, left: 0 });
  const [buttonPosition, setButtonPosition] = useState({ top: 0, left: 0 });
  const [navbarHeight, setNavbarHeight] = useState(90);
  const [isLoading, setIsLoading] = useState(true);
  const buttonRef = useRef<HTMLDivElement>(null);
  const sidebarRef = useRef<HTMLDivElement>(null);

  const allCategories = useContentStore((state) => state.categories);
  const setAllCategories = useContentStore((state) => state.setCategories);

  // Fetch categories
  useEffect(() => {
    const loadCategories = async () => {
      if (allCategories.length > 0) {
        setIsLoading(false);
        return;
      }

      try {
        const response = await fetchAllCategories();
        if (response.status === 200) {
          setAllCategories(response.payload.categories);
        }
      } catch (error) {
        console.log('Error fetching categories:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadCategories();
  }, [allCategories.length, setAllCategories]);

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

  // Update button and sidebar positions
  useEffect(() => {
    const updatePositions = () => {
      if (buttonRef.current) {
        const rect = buttonRef.current.getBoundingClientRect();
        setButtonPosition({ top: rect.top, left: rect.left });
        setSidebarPosition({ top: rect.bottom, left: rect.left });
      }
    };

    updatePositions();

    window.addEventListener('resize', updatePositions);
    window.addEventListener('scroll', updatePositions, true);

    return () => {
      window.removeEventListener('resize', updatePositions);
      window.removeEventListener('scroll', updatePositions, true);
    };
  }, [sidebarOpen]);

  // Handle click outside
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
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [sidebarOpen]);

  if (isLoading) {
    return <ShopUtilitySkeleton />;
  }

  return (
    <>
      {/* Backdrop Overlay */}
      <AnimatePresence>
        {sidebarOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40 bg-black/40"
            onClick={() => setSidebarOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* Shop by Category Button - Fixed above backdrop */}
      {sidebarOpen && (
        <div
          className="fixed z-50"
          style={{
            top: `${buttonPosition.top}px`,
            left: `${buttonPosition.left}px`,
          }}
        >
          <ShopByCategory isOpen={sidebarOpen} onToggle={setSidebarOpen} />
        </div>
      )}

      {/* Navigation Bar */}
      <nav
        ref={ref}
        className="sticky z-30 hidden w-full items-center justify-center bg-white p-3 shadow-sm md:p-4 lg:flex lg:p-5"
        style={{ top: `${navbarHeight}px` }}
      >
        <Container className="flex items-center gap-2.5">
          <div ref={buttonRef}>
            <ShopByCategory isOpen={sidebarOpen} onToggle={setSidebarOpen} />
          </div>

          <div className="scrollbar-hide flex flex-1 gap-2.5 overflow-x-auto">
            {allCategories.slice(0, 6).map((category) => (
              <CategoryItem
                key={category.id}
                name={category.name}
                slug={category.slug}
                icon={category.imageUrl || '/placeholder-category.png'}
              />
            ))}
          </div>
        </Container>
      </nav>

      {/* Category Sidebar */}
      <AnimatePresence>
        {sidebarOpen && (
          <div ref={sidebarRef}>
            <CategorySidebar position={sidebarPosition} onClose={() => setSidebarOpen(false)} />
          </div>
        )}
      </AnimatePresence>
    </>
  );
});

ShopUtility.displayName = 'ShopUtility';

export default ShopUtility;
