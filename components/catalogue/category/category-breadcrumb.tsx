'use client';

import { ChevronRight } from '@/components/shared/svg/svg-icon';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useMemo } from 'react';

interface CategoryBreadcrumbItem {
  name: string;
  href: string;
}

const CategoryBreadcrumb = () => {
  const pathname = usePathname();

  const breadcrumbs = useMemo((): CategoryBreadcrumbItem[] => {
    // Always start with Home
    const items: CategoryBreadcrumbItem[] = [{ name: 'Home', href: '/' }];

    // Split pathname and filter empty strings
    const segments = pathname.split('/').filter(Boolean);

    // If not on /pc route, return just Home
    if (segments[0] !== 'pc') {
      return items;
    }

    // Build breadcrumb items from path segments
    let currentPath = '';
    segments.forEach((segment, index) => {
      if (segment === 'pc' && index === 0) return; // Skip 'pc' segment

      currentPath += `/${segment}`;

      // Format segment name: remove hyphens and capitalize
      const name = segment
        .split('-')
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');

      items.push({
        name,
        href: `/pc${currentPath}`,
      });
    });

    return items;
  }, [pathname]);

  if (breadcrumbs.length <= 1) {
    return null; // Don't show breadcrumb if only Home
  }

  return (
    <nav aria-label="Breadcrumb" className="border-b bg-white px-4 py-3">
      <ol className="flex items-center gap-2 text-sm">
        {breadcrumbs.map((item, index) => {
          const isLast = index === breadcrumbs.length - 1;

          return (
            <li key={item.href} className="flex items-center gap-2">
              {index > 0 && <ChevronRight className="h-4 w-4 text-gray-400" />}

              {isLast ? (
                <span className="font-medium text-gray-900">{item.name}</span>
              ) : (
                <Link href={item.href} className="text-gray-600 transition-colors hover:text-orange-600">
                  {item.name}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
};

export default CategoryBreadcrumb;
