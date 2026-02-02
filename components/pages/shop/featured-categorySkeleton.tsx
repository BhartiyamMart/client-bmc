import Container from '@/components/shared/ui/container';
import Section from '@/components/shared/ui/section';
import { Skeleton } from '@/components/ui/skeleton';

const FeaturedCategorySkeleton = () => {
  // Single responsive layout using Tailwind breakpoints
  return (
    <Section className="py-6">
      <Container>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="flex flex-col overflow-hidden rounded-xl border bg-white">
              {/* Header Skeleton */}
              <div className="flex min-h-12.5 items-center justify-center bg-[#FFE3C5] px-3 py-2">
                <Skeleton className="h-4 w-20 sm:h-5 sm:w-24" />
              </div>

              {/* Image Skeleton */}
              <div className="flex flex-1 items-center justify-center p-4 sm:p-5">
                <Skeleton className="aspect-square w-full rounded-lg" />
              </div>
            </div>
          ))}
        </div>
      </Container>
    </Section>
  );
};

export default FeaturedCategorySkeleton;
