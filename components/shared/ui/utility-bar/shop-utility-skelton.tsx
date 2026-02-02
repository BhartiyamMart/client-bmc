'use client';

import Container from '@/components/shared/ui/container';

const ShopUtilitySkeleton = () => {
  return (
    <nav className="sticky z-30 hidden w-full items-center justify-center bg-white p-3 shadow-sm md:p-4 lg:flex lg:p-5">
      <Container className="flex items-center gap-2.5">
        {/* Shop by Category Button Skeleton */}
        <div className="h-10 w-40 animate-pulse rounded bg-gray-200" />

        {/* Category Items Skeleton */}
        <div className="scrollbar-hide flex flex-1 gap-2.5 overflow-x-auto">
          {Array.from({ length: 6 }).map((_, index) => (
            <div
              key={index}
              className="flex h-10 shrink-0 items-center gap-2 rounded-sm border border-gray-200 bg-white px-3"
            >
              <div className="h-5 w-5 shrink-0 animate-pulse rounded bg-gray-200" />
              <div className="h-4 w-24 animate-pulse rounded bg-gray-200" />
            </div>
          ))}
        </div>
      </Container>
    </nav>
  );
};

export default ShopUtilitySkeleton;
