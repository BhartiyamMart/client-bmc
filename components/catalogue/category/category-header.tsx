'use client';

// import { Menu } from 'lucide-react';
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
  // Format title: Remove hyphens and capitalize properly
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
    <header className="flex flex-col border-b bg-white">
      {/* Top Row */}
      <div className="flex items-center gap-3 px-4 py-3">
        {/* Menu Button (Mobile Only) */}
        {showMenuButton && (
          <button onClick={onMenuClick} className="rounded-lg p-2 hover:bg-gray-100 lg:hidden" aria-label="Open menu">
            {/* <Menu className="h-5 w-5 text-gray-700" /> */}
          </button>
        )}

        {/* Title */}
        <div className="flex-1">
          <h1 className="text-lg font-semibold text-gray-900">{formatTitle(title)}</h1>
          {productCount !== undefined && (
            <p className="text-xs text-gray-500">
              {productCount} {productCount === 1 ? 'product' : 'products'}
            </p>
          )}
        </div>

        {/* Desktop Sort Dropdown */}
        <div className="hidden lg:block">
          <Select defaultValue="relevance" onValueChange={handleSortChange}>
            <SelectTrigger className="w-[180px]">
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
      <div className="border-t px-4 py-2 lg:hidden">
        <Select defaultValue="relevance" onValueChange={handleSortChange}>
          <SelectTrigger className="w-full">
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
