'use client';

import Container from '@/components/shared/ui/container';
import Section from '@/components/shared/ui/section';
import SectionTitle from '@/components/shared/ui/section-title';
import Slider from '@/components/shared/ui/slider';

const LimitedOfferSkeleton = () => {
  const SkeletonCard = () => (
    <div className="w-full animate-pulse rounded-lg border bg-white p-3 shadow-sm">
      <div className="mb-3 h-32 w-full rounded-md bg-gray-200"></div>
      <div className="mb-2 h-4 w-3/4 rounded bg-gray-200"></div>
      <div className="mb-4 h-3 w-1/2 rounded bg-gray-200"></div>
      <div className="flex items-center gap-2">
        <div className="h-4 w-12 rounded bg-gray-200"></div>
        <div className="h-4 w-8 rounded bg-gray-200"></div>
      </div>
    </div>
  );

  const skeletonCards = Array.from({ length: 8 }).map((_, i) => (
    <div key={i} className="px-2">
      <SkeletonCard />
    </div>
  ));

  return (
    <Section className="my-8">
      <Container>
        <div className="mb-6">
          <SectionTitle title="Limited Stock" />
        </div>

        <div className="mt-5">
          <Slider
            cards={skeletonCards}
            slidesToShow={4}
            slidesToScroll={1}
            responsiveBreakpoints={{
              0: { slidesToShow: 1, slidesToScroll: 1 },
              480: { slidesToShow: 1.5, slidesToScroll: 1 },
              640: { slidesToShow: 2, slidesToScroll: 1 },
              768: { slidesToShow: 2.5, slidesToScroll: 1 },
              1024: { slidesToShow: 3, slidesToScroll: 1 },
              1200: { slidesToShow: 3.5, slidesToScroll: 1 },
              1400: { slidesToShow: 4, slidesToScroll: 1 },
            }}
            showArrows={false}
            showDots={false}
            autoPlay={false}
            infinite={false}
            className="-mx-2"
            cardClassName="h-full"
          />
        </div>
      </Container>
    </Section>
  );
};

export default LimitedOfferSkeleton;
