interface FeaturedBannerSkeletonProps {
  dots?: number;
}

const FeaturedBannerSkeleton = ({ dots = 4 }: FeaturedBannerSkeletonProps) => {
  return (
    <section className="w-full py-4">
      <div className="container mx-auto px-4">
        <div className="relative">
          {/* Mobile Skeleton */}
          <div
            className="relative block w-full animate-pulse rounded-xl bg-gray-200 lg:hidden"
            style={{ aspectRatio: '2.58/1' }}
          />
          {/* Desktop Skeleton */}
          <div
            className="relative hidden w-full animate-pulse rounded-2xl bg-gray-200 lg:block"
            style={{ aspectRatio: '5.45/1' }}
          />

          {/* Dots Skeleton */}
          <div className="mt-4 flex items-center justify-center gap-2">
            {Array.from({ length: dots }).map((_, i) => (
              <div key={i} className="h-2 w-2 animate-pulse rounded-full bg-gray-300" />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturedBannerSkeleton;
