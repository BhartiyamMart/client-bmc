// components/home/best-seller-picksSkeleton.tsx
import Section from '@/components/shared/ui/section';
import Container from '@/components/shared/ui/container';

const BestSellerSkeleton = () => {
  return (
    <Section className="">
      <Container>
        <section className="w-full rounded-xl bg-[#FBE4CA] py-5">
          <div className="mx-auto flex flex-col gap-6 px-4 lg:flex-row lg:items-center lg:gap-4">
            {/* Text Section Skeleton - Matches actual layout */}
            <div className="flex w-full shrink-0 flex-col items-center justify-center lg:ml-5 lg:w-[280px] lg:items-start xl:w-[300px]">
              {/* Title skeleton */}
              <div className="h-8 w-48 animate-pulse rounded-md bg-gray-300/60" />

              {/* Description skeleton */}
              <div className="mt-3 space-y-2 lg:mt-5">
                <div className="h-6 w-52 animate-pulse rounded-md bg-gray-300/60" />
                <div className="h-6 w-40 animate-pulse rounded-md bg-gray-300/60 lg:w-52" />
              </div>

              {/* Button skeleton */}
              <div className="mt-5 h-12 w-32 animate-pulse rounded-md bg-white/80" />
            </div>

            {/* Slider Section Skeleton - Takes remaining space */}
            <div className="w-full lg:min-w-0 lg:flex-1">
              <div className="flex gap-4 overflow-hidden px-2">
                {/* Desktop: Show 4 cards, Mobile: Show 1-2 cards */}
                {Array.from({ length: 4 }).map((_, i) => (
                  <div
                    key={i}
                    className={`w-full shrink-0 rounded-xl border border-gray-200 bg-white p-3 shadow-sm sm:w-[calc(50%-8px)] lg:w-[calc(33.333%-11px)] xl:w-[calc(25%-12px)] ${
                      i >= 2 ? 'hidden lg:block' : ''
                    } ${i >= 3 ? 'hidden xl:block' : ''}`}
                  >
                    {/* Image skeleton */}
                    <div className="mb-1 flex h-50 items-center justify-center sm:h-45 md:h-54 lg:h-60">
                      <div className="h-full w-full animate-pulse rounded-lg bg-gray-300/60" />
                    </div>

                    {/* Delivery time row skeleton */}
                    <div className="mb-1 flex h-4 items-center justify-between">
                      <div className="h-3 w-12 animate-pulse rounded bg-gray-300/60" />
                      <div className="h-5 w-16 animate-pulse rounded bg-gray-300/60" />
                    </div>

                    {/* Product name skeleton (2 lines) */}
                    <div className="h-[38px] space-y-1 pt-1.5">
                      <div className="h-4 w-full animate-pulse rounded bg-gray-300/60" />
                      <div className="h-4 w-3/4 animate-pulse rounded bg-gray-300/60" />
                    </div>

                    {/* Price skeleton */}
                    <div className="mt-1.5 mb-1 flex items-center gap-2">
                      <div className="h-6 w-16 animate-pulse rounded bg-gray-300/60" />
                      <div className="h-4 w-12 animate-pulse rounded bg-gray-300/60" />
                    </div>

                    {/* Button skeleton */}
                    <div className="mt-3 flex items-center gap-2">
                      <div className="h-10 w-10 animate-pulse rounded-sm bg-gray-300/60" />
                      <div className="h-10 flex-1 animate-pulse rounded-sm bg-orange-100/60" />
                    </div>

                    {/* Variants text skeleton */}
                    <div className="mt-2 flex h-4 justify-center">
                      <div className="h-3 w-16 animate-pulse rounded bg-gray-300/60" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </Container>
    </Section>
  );
};

export default BestSellerSkeleton;
