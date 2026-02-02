'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { useCategories } from '@/hooks/useCategories';

interface CategorySidebarProps {
  position: { top: number; left: number };
  onClose: () => void;
}

const CategorySidebar = ({ position, onClose }: CategorySidebarProps) => {
  const [activeCategory, setActiveCategory] = useState<number>(0);
  const [activeSubCategory, setActiveSubCategory] = useState<number>(0);

  const { categories, isLoading } = useCategories({ autoFetch: true });

  useEffect(() => {
    setActiveSubCategory(0);
  }, [activeCategory]);

  const currentSubcategories = categories[activeCategory]?.subcategories || [];
  const currentNestedSubcategories = currentSubcategories[activeSubCategory]?.subcategories || [];

  const hasSubcategories = currentSubcategories.length > 0;
  const hasNestedSubcategories = currentNestedSubcategories.length > 0;

  // Build URL paths
  const buildCategoryPath = (slug: string) => `/pc/${slug}`;
  const buildSubcategoryPath = (parentSlug: string, slug: string) => `/pc/${parentSlug}/${slug}`;
  const buildNestedPath = (grandParentSlug: string, parentSlug: string, slug: string) =>
    `/pc/${grandParentSlug}/${parentSlug}/${slug}`;

  return (
    <motion.aside
      initial={{ opacity: 0, scale: 0, transformOrigin: 'top left' }}
      animate={{ opacity: 1, scale: 1, transformOrigin: 'top left' }}
      exit={{ opacity: 0, scale: 0, transformOrigin: 'top left' }}
      transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
      className="fixed z-50 mt-2 flex overflow-hidden rounded bg-white shadow-lg"
      style={{ top: `${position.top}px`, left: `${position.left}px` }}
      role="navigation"
      aria-label="Category navigation"
    >
      {/* First Column - Main Categories */}
      <div className="customScrollbar flex h-120 w-68 flex-col overflow-y-auto border-r border-gray-200">
        {isLoading || categories.length === 0 ? (
          <div className="flex h-full items-center justify-center">
            <p className="text-sm text-gray-500">{isLoading ? 'Loading categories...' : 'No categories available'}</p>
          </div>
        ) : (
          <ul>
            {categories.map((cat, index) => (
              <li key={cat.id}>
                <Link
                  href={buildCategoryPath(cat.slug)}
                  onMouseEnter={() => setActiveCategory(index)}
                  onClick={onClose}
                  className={`flex w-full cursor-pointer items-center justify-between px-5 py-3.5 text-left text-[15px] font-medium transition-colors ${
                    activeCategory === index
                      ? 'bg-[#FFE3C5] text-[#7F3200]'
                      : 'text-gray-800 hover:bg-[#FFF4E6] hover:text-[#7F3200]'
                  }`}
                  aria-current={activeCategory === index ? 'true' : 'false'}
                >
                  <span>{cat.name}</span>
                  {cat.hasChildren && cat.subcategories && cat.subcategories.length > 0 && (
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
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Second Column - Subcategories */}
      {hasSubcategories && (
        <div className="customScrollbar flex h-120 w-68 flex-col overflow-y-auto border-r border-gray-200 bg-white">
          <ul>
            {currentSubcategories.map((sub, index) => (
              <li key={sub.id}>
                <Link
                  href={buildSubcategoryPath(categories[activeCategory].slug, sub.slug)}
                  onMouseEnter={() => setActiveSubCategory(index)}
                  onClick={onClose}
                  className={`flex w-full cursor-pointer items-center justify-between px-5 py-3.5 text-left text-[15px] font-medium transition-colors ${
                    activeSubCategory === index
                      ? 'bg-[#FFE3C5] text-[#7F3200]'
                      : 'text-gray-800 hover:bg-[#FFF4E6] hover:text-[#7F3200]'
                  }`}
                >
                  <span>{sub.name}</span>
                  {sub.hasChildren && sub.subcategories && sub.subcategories.length > 0 && (
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
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Third Column - Nested Subcategories */}
      {hasSubcategories && hasNestedSubcategories && (
        <div className="customScrollbar flex h-120 w-68 flex-col overflow-y-auto bg-white">
          <ul>
            {currentNestedSubcategories.map((nestedSub) => (
              <li key={nestedSub.id}>
                <Link
                  href={buildNestedPath(
                    categories[activeCategory].slug,
                    currentSubcategories[activeSubCategory].slug,
                    nestedSub.slug
                  )}
                  onClick={onClose}
                  className="block w-full cursor-pointer px-5 py-3.5 text-left text-[15px] font-medium text-gray-800 transition-colors hover:bg-[#FFE3C5] hover:text-[#7F3200]"
                >
                  {nestedSub.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </motion.aside>
  );
};

export default CategorySidebar;
