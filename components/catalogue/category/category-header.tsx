'use client';

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface CategoryHeaderProps {
  title: string;
  onBack: () => void;
  onMenuClick: () => void;
  showBackButton: boolean;
  showMenuButton: boolean;
  productCount?: number;
  onSortChange?: (value: string) => void;
}

const CategoryHeader = ({ title, onMenuClick, showMenuButton, productCount, onSortChange }: CategoryHeaderProps) => {
  const formatTitle = (slug: string) => {
    if (!slug) return 'All Categories';

    return slug
      .split('-')
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(' ');
  };

  const handleSortChange = (value: string) => {
    if (onSortChange) {
      onSortChange(value);
    }
  };

  return (
    <header className="flex flex-col border-b">
      {/* Top Row */}
      <div className="flex items-center gap-3 px-4 py-3.5">
        {/* Menu Button (Mobile Only) */}
        {showMenuButton && (
          <button
            onClick={onMenuClick}
            className="rounded p-2 text-orange-600 transition-colors hover:bg-orange-50 lg:hidden"
            aria-label="Open menu"
          >
            {/* <Menu className="h-5 w-5" /> */}x
          </button>
        )}

        {/* Title */}
        <div className="flex-1">
          <h1 className="text-lg font-semibold">{formatTitle(title)}</h1>
          {productCount !== undefined && (
            <p className="text-xs font-medium text-orange-600">
              {productCount} {productCount === 1 ? 'product' : 'products'}
            </p>
          )}
        </div>

        {/* Desktop Sort Dropdown */}
        <div className="hidden lg:block">
          <Select defaultValue="relevance" onValueChange={handleSortChange}>
            <SelectTrigger className="w-45 cursor-pointer rounded bg-white font-medium shadow-none">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="relevance">Relevance</SelectItem>
              <SelectItem value="price-low">Price: Low to High</SelectItem>
              <SelectItem value="price-high">Price: High to Low</SelectItem>
              <SelectItem value="newest">Newest First</SelectItem>
              <SelectItem value="rating">Top Rated</SelectItem>
              <SelectItem value="popular">Most Popular</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Mobile Sort Dropdown */}
      <div className="border-t border-orange-100 bg-orange-50/20 px-4 py-2.5 lg:hidden">
        <Select defaultValue="relevance" onValueChange={handleSortChange}>
          <SelectTrigger className="w-full border-orange-200 bg-white font-medium text-gray-700">
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="relevance">Relevance</SelectItem>
            <SelectItem value="price-low">Price: Low to High</SelectItem>
            <SelectItem value="price-high">Price: High to Low</SelectItem>
            <SelectItem value="newest">Newest First</SelectItem>
            <SelectItem value="rating">Top Rated</SelectItem>
            <SelectItem value="popular">Most Popular</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </header>
  );
};

export default CategoryHeader;
