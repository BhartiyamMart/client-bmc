'use client';

import { ChevronDown, ChevronRight } from '@/components/shared/svg/svg-icon';
import * as IContent from '@/interfaces/catalog.interface';
import { useCategoriesStore } from '@/stores/useCategories.store';

interface CategorySidebarProps {
  categories: IContent.ICategoriesData[];
  pathname: string;
  onCategoryClick: (path: string) => void;
  onClose: () => void;
  showCloseButton: boolean;
}

const CategorySidebar = ({ categories, pathname, onCategoryClick }: CategorySidebarProps) => {
  const { expandedCategories, toggleCategory, toggleExpandAll, allExpanded } = useCategoriesStore();

  // Recursive component with parent path tracking
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

    const handleClick = () => {
      onCategoryClick(categoryPath);
    };

    const handleToggle = (e: React.MouseEvent) => {
      e.stopPropagation();
      toggleCategory(Number(category.id));
    };

    return (
      <li className="relative">
        {/* Tree Lines */}
        {level > 0 && (
          <div className="absolute top-0 left-0 flex h-full">
            {parentLines.map((showLine, index) => (
              <div key={index} className="relative w-5">
                {showLine && <div className="absolute top-0 left-2.5 h-full w-px bg-gray-200" />}
              </div>
            ))}
            <div className="absolute top-4 left-0 h-px w-3 bg-gray-200" style={{ left: `${level * 20 - 8}px` }} />
            {!isLast && (
              <div className="absolute top-0 left-0 h-full w-px bg-gray-200" style={{ left: `${level * 20 - 8}px` }} />
            )}
          </div>
        )}

        <button
          onClick={handleClick}
          className={`relative flex w-full items-center gap-2 rounded-lg px-3 py-2.5 text-left transition-all ${
            isActive
              ? 'bg-orange-50 font-semibold text-orange-600 shadow-sm'
              : 'font-medium text-gray-700 hover:bg-gray-50'
          }`}
          style={{ paddingLeft: `${level * 20 + 12}px` }}
        >
          {hasChildren ? (
            <button
              onClick={handleToggle}
              className="z-10 flex-shrink-0 rounded p-0.5 transition-colors hover:bg-gray-200"
              aria-label={isExpanded ? 'Collapse' : 'Expand'}
            >
              {isExpanded ? (
                <ChevronDown className="h-4 w-4 text-gray-600" />
              ) : (
                <ChevronRight className="h-4 w-4 text-gray-600" />
              )}
            </button>
          ) : (
            <div className="w-5" />
          )}

          <span className="flex-1 truncate text-sm">{category.name}</span>

          {hasChildren && (
            <span className="ml-auto rounded-full bg-gray-100 px-2 py-0.5 text-xs font-medium text-gray-600">
              {children.length}
            </span>
          )}
        </button>

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
      {/* Categories List - No Header */}
      <div className="customScrollbarLeft flex-1 overflow-y-auto p-3">
        <nav>
          {rootCategories.length === 0 ? (
            <div className="px-4 py-16 text-center">
              <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-orange-50 to-orange-100">
                <svg className="h-10 w-10 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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

      {/* Footer with Expand/Collapse Toggle */}
      <div className="border-t bg-gradient-to-r from-gray-50 to-orange-50/30 px-4 py-3">
        <div className="flex items-center justify-between">
          <p className="text-xs font-medium text-gray-600">
            {rootCategories.length} {rootCategories.length === 1 ? 'Category' : 'Categories'}
          </p>

          <button
            onClick={toggleExpandAll}
            className="flex items-center gap-1.5 rounded-md bg-white px-3 py-1.5 text-xs font-semibold text-orange-600 shadow-sm ring-1 ring-orange-200 transition-all ring-inset hover:bg-orange-50 hover:shadow-md"
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
