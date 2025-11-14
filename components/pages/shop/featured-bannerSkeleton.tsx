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
        <div className={cn('', className)}>
          <div className="relative overflow-hidden rounded-[13px] bg-gray-50 md:rounded-2xl">
            {/* Mobile - aspect ratio 407:176 ≈ 2.3:1 */}
            <div className="relative block aspect-407/176 w-full sm:hidden">
              <Skeleton className="absolute inset-0 h-full w-full" />
            </div>

            {/* Tablet - aspect ratio 992:408 ≈ 2.4:1 */}
            <div className="relative hidden aspect-992/408 w-full sm:block lg:hidden">
              <Skeleton className="absolute inset-0 h-full w-full" />
            </div>

            {/* Desktop - aspect ratio 1531:408 ≈ 3.75:1 */}
            <div className="relative hidden aspect-1531/408 w-full lg:block">
              <Skeleton className="absolute inset-0 h-full w-full" />
            </div>
          </div>

          {showDots && (
            <div className="mt-4 flex justify-center py-2.5">
              <div className="flex items-center gap-1.5" role="status" aria-label="Loading banners">
                {Array.from({ length: Math.max(1, dots) }).map((_, i) => (
                  <Skeleton key={i} aria-hidden="true" className="h-2 w-2 rounded-full" />
                ))}
              </div>
            </div>
          )}
        </div>
      </Container>
    </Section>
  );
};

export default FeaturedBannerSkeleton;
