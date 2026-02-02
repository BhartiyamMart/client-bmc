'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import OptimizedImage from '@/components/shared/optimizeImage';

interface CategoryItemProps {
  name: string;
  icon: string;
  slug: string;
  parentSlug?: string;
}

const CategoryItem = ({ name, icon, slug, parentSlug }: CategoryItemProps) => {
  // Build nested URL path
  const categoryPath = parentSlug ? `/pc/${parentSlug}/${slug}` : `/pc/${slug}`;

  return (
    <Link href={categoryPath} aria-label={`View ${name} category`}>
      <Button className="flex h-10 shrink-0 cursor-pointer items-center gap-2 border border-gray-200 bg-white px-3 text-sm font-medium text-gray-700 transition-colors hover:bg-[#EE7C00] hover:text-white">
        <div className="relative h-5 w-5 shrink-0">
          <OptimizedImage src={icon} alt="" fill className="object-contain" sizes="20px" />
        </div>
        <span className="whitespace-nowrap">{name}</span>
      </Button>
    </Link>
  );
};

export default CategoryItem;
