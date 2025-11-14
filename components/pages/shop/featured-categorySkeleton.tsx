import Container from '@/components/shared/container';
import Section from '@/components/shared/section';
import { Skeleton } from '@/components/ui/skeleton';

const FeaturedCategorySkeleton = () => {
  return (
    <Section className="my-5">
      <Container>
        <div className="relative">
          {/* Mobile - 2 items */}
          <div className="flex gap-2 sm:hidden">
            {Array.from({ length: 2 }).map((_, i) => (
              <div key={i} className="flex-1">
                <div className="relative flex h-full w-full flex-col rounded-xl border">
                  {/* Category Name Skeleton */}
                  <div className="rounded-t-xl bg-[#FFE6CB] py-3">
                    <Skeleton className="mx-auto h-4 w-20" />
                  </div>

                  {/* Image Skeleton */}
                  <div className="flex flex-1 items-center justify-center rounded-b-xl bg-white py-4">
                    <Skeleton className="h-16 w-16 rounded-full" />
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Tablet - 3 items */}
          <div className="hidden gap-3 sm:flex md:hidden">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="flex-1">
                <div className="relative flex h-full w-full flex-col rounded-xl border">
                  {/* Category Name Skeleton */}
                  <div className="rounded-t-xl bg-[#FFE6CB] py-3">
                    <Skeleton className="mx-auto h-5 w-24" />
                  </div>

                  {/* Image Skeleton */}
                  <div className="flex flex-1 items-center justify-center rounded-b-xl bg-white py-4">
                    <Skeleton className="h-20 w-20 rounded-full" />
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Desktop - 4 items */}
          <div className="hidden gap-4 md:flex lg:hidden">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="flex-1">
                <div className="relative flex h-full w-full flex-col rounded-xl border">
                  {/* Category Name Skeleton */}
                  <div className="rounded-t-xl bg-[#FFE6CB] py-3">
                    <Skeleton className="mx-auto h-6 w-28" />
                  </div>

                  {/* Image Skeleton */}
                  <div className="flex flex-1 items-center justify-center rounded-b-xl bg-white py-4">
                    <Skeleton className="h-32 w-32 rounded-full" />
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Large Desktop - 5 items */}
          <div className="hidden gap-4 lg:flex xl:hidden">
            {Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className="flex-1">
                <div className="relative flex h-full w-full flex-col rounded-xl border">
                  {/* Category Name Skeleton */}
                  <div className="rounded-t-xl bg-[#FFE6CB] py-3">
                    <Skeleton className="mx-auto h-7 w-32" />
                  </div>

                  {/* Image Skeleton */}
                  <div className="flex flex-1 items-center justify-center rounded-b-xl bg-white py-4">
                    <Skeleton className="h-36 w-36 rounded-full" />
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Extra Large Desktop - 6 items */}
          <div className="hidden gap-5 xl:flex">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="flex-1">
                <div className="relative flex h-full w-full flex-col rounded-xl border">
                  {/* Category Name Skeleton */}
                  <div className="rounded-t-xl bg-[#FFE6CB] py-3">
                    <Skeleton className="mx-auto h-8 w-36" />
                  </div>

                  {/* Image Skeleton */}
                  <div className="flex flex-1 items-center justify-center rounded-b-xl bg-white py-4">
                    <Skeleton className="h-40 w-40 rounded-full" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </Section>
  );
};

export default FeaturedCategorySkeleton;
