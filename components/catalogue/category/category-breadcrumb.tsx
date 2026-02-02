'use client';

import Link from 'next/link';
import { useMemo } from 'react';
import { usePathname } from 'next/navigation';
import { ChevronRight } from '@/components/shared/svg/svg-icon';

interface BreadcrumbItem {
  name: string;
  href: string;
}

const CategoryBreadcrumb = () => {
  const pathname = usePathname();

  const breadcrumbs = useMemo((): BreadcrumbItem[] => {
    const items: BreadcrumbItem[] = [{ name: 'Home', href: '/' }];
    const segments = pathname.split('/').filter(Boolean);

    if (segments[0] !== 'pc') {
      return items;
    }

    let currentPath = '';
    segments.forEach((segment, index) => {
      if (segment === 'pc' && index === 0) return;

      currentPath += `/${segment}`;

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
    return null;
  }

  return (
    <nav aria-label="Breadcrumb" className="border-b border-gray-200 px-4 py-3">
      <ol className="flex items-center gap-2 text-sm">
        {breadcrumbs.map((item, index) => {
          const isLast = index === breadcrumbs.length - 1;
          return (
            <li key={item.href} className="flex items-center gap-2">
              {index > 0 && <ChevronRight className="h-3.5 w-3.5 text-gray-400" strokeWidth={2.5} />}
              {isLast ? (
                <span className="text-primary font-semibold">{item.name}</span>
              ) : (
                <Link href={item.href} className="font-medium text-gray-600 transition-colors hover:text-orange-600">
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
