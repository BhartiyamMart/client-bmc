import Section from '@/components/shared/ui/section';
import Container from '@/components/shared/ui/container';

const CategoryBannerSkeleton = () => {
  return (
    <Section>
      <Container>
        {/* Desktop Skeleton Grid */}
        <div className="hidden w-full grid-cols-3 gap-4 lg:grid">
          {Array.from({ length: 3 }).map((_, index) => (
            <div key={index} className="relative aspect-3/2 w-full animate-pulse rounded-sm bg-gray-200" />
          ))}
        </div>

        {/* Mobile Skeleton Scroll */}
        <div className="scrollbar-hide flex w-full gap-4 overflow-x-auto lg:hidden">
          {Array.from({ length: 3 }).map((_, index) => (
            <div
              key={index}
              className="relative aspect-3/2 w-[90%] shrink-0 animate-pulse rounded-sm bg-gray-200 sm:w-[48%]"
            />
          ))}
        </div>
      </Container>
    </Section>
  );
};

export default CategoryBannerSkeleton;
