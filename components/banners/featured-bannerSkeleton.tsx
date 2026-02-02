import Section from '@/components/shared/ui/section';
import Container from '@/components/shared/ui/container';

interface FeaturedBannerSkeletonProps {
  dots?: number;
}

const FeaturedBannerSkeleton = ({ dots = 4 }: FeaturedBannerSkeletonProps) => {
  return (
    <Section>
      <Container>
        <div className="relative">
          {/* Mobile Skeleton (< 1024px) - Aspect Ratio 2.58:1 */}
          <div
            className="relative block w-full animate-pulse rounded-[12px] bg-gray-200 lg:hidden"
            style={{ aspectRatio: '2.58/1' }}
          />

          {/* Desktop Skeleton (>= 1024px) - Aspect Ratio 5.45:1 */}
          <div
            className="relative hidden w-full animate-pulse rounded-2xl bg-gray-200 lg:block"
            style={{ aspectRatio: '5.45/1' }}
          />

          {/* Pagination Dots Skeleton */}
          {dots > 1 && (
            <div className="mt-3 flex items-center justify-center gap-2">
              {Array.from({ length: dots }).map((_, i) => (
                <div key={i} className="h-2 w-2 animate-pulse rounded-full bg-gray-300" />
              ))}
            </div>
          )}
        </div>
      </Container>
    </Section>
  );
};

export default FeaturedBannerSkeleton;
