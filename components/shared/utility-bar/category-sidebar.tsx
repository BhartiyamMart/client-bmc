'use client';

import { useState } from 'react';
import ShopByCategory from '@/components/shared/utility-bar/shop-by-category';

interface CategorySidebarProps {
  position: { top: number; left: number };
  onClose: () => void;
}

interface Category {
  name: string;
  subcategories: string[];
}

const ASIDE_CATEGORIES: Category[] = [
  {
    name: 'Electronics',
    subcategories: [
      'Audio devices',
      'Cameras & Accessories',
      'Electrical Accessories',
      'Home Appliances',
      'Kitchen Appliances',
      'Personal Care & Grooming',
      'Phone & Laptop Accessory',
      'Phone, Laptop & Tablets',
      'Smart Wearables',
      'TVs & Monitors',
    ],
  },
  {
    name: 'Beauty and hygiene',
    subcategories: [
      'Oral Care',
      'Bath & Hand Wash',
      'Feminine Hygiene',
      'Fragrances & Deos',
      'Hair Care',
      'Health & Medicine',
      'Makeup',
      "Men's Grooming",
      'Sexual Wellness',
      'Skin Care',
    ],
  },
  {
    name: 'Fashion',
    subcategories: [
      "Men's Clothing",
      "Women's Clothing",
      'Kids Clothing',
      'Footwear',
      'Accessories',
      'Watches',
      'Bags & Luggage',
    ],
  },
  {
    name: 'Food Court',
    subcategories: ['Fast Food', 'Beverages', 'Desserts', 'Snacks'],
  },
  {
    name: 'Pharmacy & Wellness',
    subcategories: ['Medicines', 'Health Supplements', 'Baby Care', 'Fitness & Nutrition', 'Healthcare Devices'],
  },
  {
    name: 'Fruits & Vegetables',
    subcategories: ['Fresh Fruits', 'Fresh Vegetables', 'Exotic Fruits', 'Organic', 'Herbs & Seasonings'],
  },
  {
    name: 'Foodgrains, Oil & Masala',
    subcategories: ['Rice & Rice Products', 'Dals & Pulses', 'Edible Oils', 'Masalas & Spices', 'Dry Fruits'],
  },
  {
    name: 'Bakery, Cakes & Dairy',
    subcategories: ['Breads & Buns', 'Cakes & Pastries', 'Milk', 'Cheese', 'Butter & Ghee', 'Eggs'],
  },
  {
    name: 'Beverages',
    subcategories: ['Tea', 'Coffee', 'Juices', 'Soft Drinks', 'Energy Drinks', 'Health Drinks'],
  },
  {
    name: 'Snacks & Branded Foods',
    subcategories: ['Biscuits', 'Chips & Namkeen', 'Chocolates', 'Noodles & Pasta', 'Ready to Cook'],
  },
];

const CategorySidebar = ({ position, onClose }: CategorySidebarProps) => {
  const [activeCategory, setActiveCategory] = useState<number>(0);

  return (
    <>
      <div className="fixed z-50 mt-2" style={{ top: `${position.top - 48}px`, left: `${position.left}px` }}>
        <ShopByCategory isOpen={true} onToggle={onClose} />
      </div>
      <aside
        className="fixed z-50 mt-2 flex overflow-hidden rounded bg-white shadow"
        style={{ top: `${position.top}px`, left: `${position.left}px` }}
        role="navigation"
        aria-label="Category navigation"
      >
        {/* Left Column - Main Categories */}
        <div className="customScrollbar flex h-[480px] w-68 flex-col overflow-y-auto border-x border-gray-200">
          <ul>
            {ASIDE_CATEGORIES.map((cat, index) => (
              <li key={cat.name}>
                <button
                  onMouseEnter={() => setActiveCategory(index)}
                  className={`flex w-full cursor-pointer items-center justify-between px-5 py-3.5 text-left text-[15px] font-medium transition-colors ${
                    activeCategory === index
                      ? 'bg-[#FFE3C5] text-[#7F3200]'
                      : 'text-gray-800 hover:bg-[#FFF4E6] hover:text-[#7F3200]'
                  }`}
                >
                  <span>{cat.name}</span>
                  {cat.subcategories.length > 0 && (
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
        </div>

        {/* Right Column - Subcategories */}
        <div className="customScrollbar flex h-[480px] w-68 flex-col overflow-y-auto bg-white">
          <div className="flex flex-col gap-1.5">
            {ASIDE_CATEGORIES[activeCategory].subcategories.map((sub) => (
              <button
                key={sub}
                type="button"
                className="cursor-pointer px-5 py-3.5 text-left text-[15px] font-medium text-gray-800 transition-colors hover:bg-[#FFE3C5] hover:text-[#7F3200]"
              >
                {sub}
              </button>
            ))}
          </div>
        </div>
      </aside>
    </>
  );
};

export default CategorySidebar;
