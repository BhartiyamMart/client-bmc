'use client';

import * as IContent from '@/interfaces/catalog.interface';
import { useCategoriesStore } from '@/stores/useCategories.store';
import { ChevronDown, ChevronRight } from '@/components/shared/svg/svg-icon';
import OptimizedImage from '@/components/shared/optimizeImage';

interface CategorySidebarProps {
  categories: IContent.ICategoriesData[];
  pathname: string;
  onCategoryClick: (path: string) => void;
  onClose: () => void;
  showCloseButton: boolean;
}

const CategorySidebar = ({ categories, pathname, onCategoryClick }: CategorySidebarProps) => {
  const { expandedCategories, toggleCategory, toggleExpandAll, allExpanded } = useCategoriesStore();

  const CategoryItem = ({
    category,
    level = 0,
    isLast = false,
    parentLines = [],
    parentPath = '/pc',
  }: {
    category: IContent.ICategoriesData;
    level?: number;
    isLast?: boolean;
    parentLines?: boolean[];
    parentPath?: string;
  }) => {
    const categoryPath = `${parentPath}/${category.slug}`;
    const isActive = pathname === categoryPath;

    const children = category.children || category.subcategories || [];
    const hasChildren = children && children.length > 0;
    const isExpanded = expandedCategories.has(Number(category.id));

    // Get category image
    const categoryImage = category.imageUrl || category.imageUrl || '/placeholder-category.png';

    const handleClick = () => {
      onCategoryClick(categoryPath);
    };

    const handleToggle = (e: React.MouseEvent) => {
      e.stopPropagation();
      toggleCategory(Number(category.id));
    };

    return (
      <li className="relative">
        <button
          onClick={handleClick}
          className={`relative flex w-full cursor-pointer items-center gap-2.5 rounded px-3 py-2.5 text-left transition-all ${
            isActive
              ? 'bg-primary-light text-primary font-semibold'
              : 'hover:bg-primary-light hover:text-primary font-medium text-gray-700'
          }`}
          style={{ paddingLeft: `${level * 20 + 12}px` }}
        >
          {/* Expand/Collapse Icon */}
          {hasChildren ? (
            <button
              onClick={handleToggle}
              className="z-10 shrink-0 rounded p-0.5 transition-colors hover:bg-orange-100"
              aria-label={isExpanded ? 'Collapse' : 'Expand'}
            >
              {isExpanded ? (
                <ChevronDown className={`h-4 w-4 ${isActive ? 'text-primary' : 'text-gray-500'}`} />
              ) : (
                <ChevronRight className={`h-4 w-4 ${isActive ? 'text-primary' : 'text-gray-500'}`} />
              )}
            </button>
          ) : (
            <div className="w-5" />
          )}

          {/* Category Image */}
          <div className={`relative h-7 w-7 shrink-0 overflow-hidden rounded`}>
            <OptimizedImage src={categoryImage} alt={category.name} fill className="object-cover" sizes={'28px'} />
          </div>

          {/* Category Name */}
          <span className="flex-1 truncate text-sm">{category.name}</span>

          {/* Children Count Badge */}
          {hasChildren && (
            <span className="bg-primary-dark ml-auto rounded-full px-2 py-0.5 text-xs font-medium text-white">
              {children.length}
            </span>
          )}
        </button>

        {/* Nested Children */}
        {hasChildren && isExpanded && (
          <ul className="mt-0.5 space-y-0.5">
            {children.map((child: IContent.ICategoriesData, index: number) => (
              <CategoryItem
                key={child.id}
                category={child}
                level={level + 1}
                isLast={index === children.length - 1}
                parentLines={[...parentLines, !isLast]}
                parentPath={categoryPath}
              />
            ))}
          </ul>
        )}
      </li>
    );
  };

  const rootCategories = categories.filter((cat) => cat.depth === 0 || !cat.parentId || cat.parentId === null);

  return (
    <div className="flex h-full flex-col bg-white">
      {/* Categories List */}
      <div className="customScrollbarLeft flex-1 overflow-y-auto p-3">
        <nav>
          {rootCategories.length === 0 ? (
            <div className="px-4 py-16 text-center">
              <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-linear-to-br from-orange-100 to-orange-200">
                <svg className="h-10 w-10 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
                  />
                </svg>
              </div>
              <p className="text-sm font-semibold text-gray-900">No categories available</p>
              <p className="mt-1 text-xs text-gray-500">Categories will appear here</p>
            </div>
          ) : (
            <ul className="space-y-1">
              {rootCategories.map((category, index) => (
                <CategoryItem
                  key={category.id}
                  category={category}
                  isLast={index === rootCategories.length - 1}
                  parentLines={[]}
                  parentPath="/pc"
                />
              ))}
            </ul>
          )}
        </nav>
      </div>

      {/* Footer */}
      <div className="border-t px-4 py-3">
        <div className="flex items-center justify-between">
          <p className="text-xs font-semibold text-gray-700">
            {rootCategories.length} {rootCategories.length === 1 ? 'Category' : 'Categories'}
          </p>

          <button
            onClick={toggleExpandAll}
            className="flex cursor-pointer items-center gap-1.5 rounded bg-white px-3 py-1.5 text-xs font-semibold text-orange-600 ring-1 ring-orange-200 transition-all ring-inset hover:bg-orange-50 hover:ring-orange-300"
          >
            {allExpanded ? (
              <>
                <ChevronDown className="h-3.5 w-3.5" />
                <span>Collapse</span>
              </>
            ) : (
              <>
                <ChevronRight className="h-3.5 w-3.5" />
                <span>Expand</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CategorySidebar;
