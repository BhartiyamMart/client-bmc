'use client';

import { useEffect, useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import ShopByCategory from '@/components/shared/ui/utility-bar/shop-by-category';
import { fetchAllCategories } from '@/apis/content.api';
import { ISubCategoryData } from '@/interfaces/content.interface';
import { useContentStore } from '@/stores/useContent.store';

interface CategorySidebarProps {
  position: { top: number; left: number };
  onClose: () => void;
}

const CategorySidebar = ({ position, onClose }: CategorySidebarProps) => {
  const [activeCategory, setActiveCategory] = useState<number>(0);
  const [activeSubCategory, setActiveSubCategory] = useState<number>(0);
  const allCategories = useContentStore((state) => state.categories);
  const setAllCategories = useContentStore((state) => state.setCategories);

  // Memoized fetch function
  const fetchCategories = useCallback(async () => {
    // Skip if categories already loaded
    if (allCategories.length > 0) return;

    try {
      const response = await fetchAllCategories();
      if (response.status === 200) {
        setAllCategories(response.payload.categories);
      }
    } catch (error) {
      console.log('Error fetching categories:', error);
    }
  }, [allCategories.length, setAllCategories]);

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  // Reset active subcategory when main category changes
  useEffect(() => {
    setActiveSubCategory(0);
  }, [activeCategory]);

  const currentSubcategories = allCategories[activeCategory]?.subcategories || [];
  const currentNestedSubcategories = currentSubcategories[activeSubCategory]?.subcategories || [];

  return (
    <>
      <div className="fixed z-50 mt-2" style={{ top: `${position.top - 48}px`, left: `${position.left}px` }}>
        <ShopByCategory isOpen={true} onToggle={onClose} />
      </div>
      <motion.aside
        initial={{ opacity: 0, scale: 0, transformOrigin: 'top left' }}
        animate={{ opacity: 1, scale: 1, transformOrigin: 'top left' }}
        exit={{ opacity: 0, scale: 0, transformOrigin: 'top left' }}
        transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
        className="fixed z-50 mt-2 flex overflow-hidden rounded bg-white shadow"
        style={{ top: `${position.top}px`, left: `${position.left}px` }}
        role="navigation"
        aria-label="Category navigation"
      >
        {/* First Column - Main Categories */}
        <div className="customScrollbar flex h-[480px] w-68 flex-col overflow-y-auto border-x border-gray-200">
          {allCategories.length === 0 ? (
            <div className="flex h-full items-center justify-center">
              <p className="text-gray-500">Loading categories...</p>
            </div>
          ) : (
            <ul>
              {allCategories.map((cat, index) => (
                <li key={cat.id}>
                  <button
                    onMouseEnter={() => setActiveCategory(index)}
                    className={`flex w-full cursor-pointer items-center justify-between px-5 py-3.5 text-left text-[15px] font-medium transition-colors ${
                      activeCategory === index
                        ? 'bg-[#FFE3C5] text-[#7F3200]'
                        : 'text-gray-800 hover:bg-[#FFF4E6] hover:text-[#7F3200]'
                    }`}
                    aria-current={activeCategory === index ? 'true' : 'false'}
                  >
                    <span>{cat.name}</span>
                    {cat.hasChildren && cat.subcategories.length > 0 && (
                      <svg
                        width="7"
                        height="12"
                        viewBox="0 0 7 12"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        className="ml-3 shrink-0"
                      >
                        <path
                          d="M1 1L6 6L1 11"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    )}
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Second Column - Subcategories */}
        <div className="customScrollbar flex h-[480px] w-68 flex-col overflow-y-auto border-r border-gray-200 bg-white">
          {currentSubcategories.length > 0 ? (
            <div className="flex flex-col gap-1.5">
              {currentSubcategories.map((sub, index) => (
                <button
                  key={sub.id}
                  type="button"
                  onMouseEnter={() => setActiveSubCategory(index)}
                  className={`flex cursor-pointer items-center justify-between px-5 py-3.5 text-left text-[15px] font-medium transition-colors ${
                    activeSubCategory === index
                      ? 'bg-[#FFE3C5] text-[#7F3200]'
                      : 'text-gray-800 hover:bg-[#FFF4E6] hover:text-[#7F3200]'
                  }`}
                >
                  <span>{sub.name}</span>
                  {sub.hasChildren && sub.subcategories.length > 0 && (
                    <svg
                      width="7"
                      height="12"
                      viewBox="0 0 7 12"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className="ml-3 shrink-0"
                    >
                      <path
                        d="M1 1L6 6L1 11"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  )}
                </button>
              ))}
            </div>
          ) : (
            <div className="flex h-full items-center justify-center">
              <p className="text-sm text-gray-500">No subcategories available</p>
            </div>
          )}
        </div>

        {/* Third Column - Nested Subcategories */}
        <div className="customScrollbar flex h-[480px] w-68 flex-col overflow-y-auto bg-white">
          {currentNestedSubcategories.length > 0 ? (
            <div className="flex flex-col gap-1.5">
              {currentNestedSubcategories.map((nestedSub) => (
                <button
                  key={nestedSub.id}
                  type="button"
                  className="cursor-pointer px-5 py-3.5 text-left text-[15px] font-medium text-gray-800 transition-colors hover:bg-[#FFE3C5] hover:text-[#7F3200]"
                >
                  {nestedSub.name}
                </button>
              ))}
            </div>
          ) : currentSubcategories.length > 0 ? (
            <div className="flex h-full items-center justify-center">
              <p className="text-sm text-gray-500">No nested subcategories</p>
            </div>
          ) : null}
        </div>
      </motion.aside>
    </>
  );
};

export default CategorySidebar;
