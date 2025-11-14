import React from 'react';
import { cn } from '@/lib/utils';
import { Skeleton } from '@/components/ui/skeleton';
import Section from '@/components/shared/section';
import Container from '@/components/shared/container';

interface IBannerSkeletonProps {
  className?: string;
  showDots?: boolean;
  dots?: number;
}

const FeaturedBannerSkeleton: React.FC<IBannerSkeletonProps> = ({ className, showDots = true, dots = 4 }) => {
  return (
    <Section>
      <Container>
        <div className={cn('relative', className)}>
          <div className="relative overflow-hidden rounded-[12px] bg-gray-50 lg:rounded-2xl">
            {/* Mobile/Tablet - aspect ratio 2.58:1 (< 1024px) */}
            <div className="relative block w-full lg:hidden" style={{ aspectRatio: '2.58/1' }}>
              <Skeleton className="absolute inset-0 h-full w-full rounded-[12px]" />
            </div>

            {/* Desktop - aspect ratio 5.45:1 (>= 1024px) */}
            <div className="relative hidden w-full lg:block" style={{ aspectRatio: '5.45/1' }}>
              <Skeleton className="absolute inset-0 h-full w-full rounded-2xl" />
            </div>
          </div>

          {/* Pagination Dots Skeleton */}
          {showDots && (
            <div className="mt-3 flex items-center justify-center gap-0.5">
              {Array.from({ length: Math.max(1, dots) }).map((_, i) => (
                <Skeleton key={i} className="h-2 w-2 rounded-full opacity-40" aria-hidden="true" />
              ))}
            </div>
          )}
        </div>
      </Container>
    </Section>
  );
};

export default FeaturedBannerSkeleton;
