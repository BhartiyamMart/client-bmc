'use client';

import Link from 'next/link';
import OptimizedImage from '@/components/shared/optimizeImage';
import { useState } from 'react';
import FeaturedCategorySkeleton from './featured-categorySkeleton';
import Section from '@/components/shared/ui/section';
import Container from '@/components/shared/ui/container';
import Slider from '@/components/shared/ui/slider';
import { useContentStore } from '@/stores/useContent.store';

const FeaturedCategory = () => {
  const [loading, setLoading] = useState(false);
  const categories = useContentStore((state) => state.categories);

  if (loading) {
    return <FeaturedCategorySkeleton />;
  }

  if (categories.length === 0) {
    return null;
  }

  const cards = categories.map((cat) => (
    <div key={cat.id}>
      <Link href={`/pc/${cat.slug}`}>
        <div className="group h-full">
          <div className="flex h-full max-h-50 flex-col overflow-hidden rounded-xl border bg-white transition-all duration-200 hover:shadow-lg">
            {/* Header */}
            <div className="min-h-12.4 flex items-center justify-center bg-[#FFE3C5] px-3 py-2">
              <h3 className="line-clamp-2 text-center text-sm leading-tight font-semibold text-[#7F3200] sm:text-base">
                {cat.name}
              </h3>
            </div>

            {/* Image */}
            <div className="flex flex-1 items-center justify-center p-4 sm:p-5">
              <div className="relative aspect-square w-full">
                <OptimizedImage
                  src={cat.imageUrl || '/placeholder-category.png'}
                  alt={cat.name}
                  fill
                  priority
                  className="object-contain transition-transform duration-200 group-hover:scale-105"
                  sizes="(max-width: 640px) 140px, (max-width: 1024px) 160px, 180px"
                />
              </div>
            </div>
          </div>
        </div>
      </Link>
    </div>
  ));

  return (
    <Section className="py-6">
      <Container>
        <Slider
          cards={cards}
          slidesToShow={6}
          slidesToScroll={1}
          responsiveBreakpoints={{
            0: { slidesToShow: 2, slidesToScroll: 1 },
            480: { slidesToShow: 2.5, slidesToScroll: 1 },
            640: { slidesToShow: 3, slidesToScroll: 1 },
            768: { slidesToShow: 4, slidesToScroll: 1 },
            1024: { slidesToShow: 5, slidesToScroll: 1 },
            1280: { slidesToShow: 6, slidesToScroll: 1 },
          }}
          showArrows
          showDots={false}
          autoPlay={false}
          infinite={false}
          centerMode={true}
          maxCardWidth="240px"
          minCardWidth="200px"
          useFixedWidth={false}
        />
      </Container>
    </Section>
  );
};

export default FeaturedCategory;
