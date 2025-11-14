'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { ICategory } from '@/interfaces/shared.interface';
import { CategoryData } from '@/data/temp';
import FeaturedCategorySkeleton from './featured-categorySkeleton';
import Section from '@/components/shared/section';
import Container from '@/components/shared/container';
import SectionTitle from '@/components/shared/section-title';
import Slider from '@/components/shared/slider';

const FeaturedCategory = () => {
  const [loading, setLoading] = useState(true);
  const [categories, setCategories] = useState<ICategory[]>([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setLoading(true);

        setCategories(CategoryData);

        if (CategoryData.length > 0) {
          setCategories(CategoryData);
        } else {
          throw new Error('No categories received from API');
        }
      } catch (err) {
        console.error('Error fetching categories, using fallback data:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  // Show skeleton while loading
  if (loading) {
    return <FeaturedCategorySkeleton />;
  }

  // Don't render if no categories available
  if (categories.length === 0) {
    return null;
  }

  const cards = categories.map((cat) => (
    <div key={cat.id} className="px-2">
      <Link href={`/category/${cat.link}`}>
        <div className="relative flex h-full flex-col items-center">
          <div className="relative flex h-full w-full flex-col rounded-xl border text-center transition-all duration-200">
            <div className="flex h-[50px] items-center justify-center rounded-t-xl bg-[#FFE6CB] px-1">
              <h3 className="text-center text-[14px] leading-[17px] font-semibold text-[#7F3200] sm:text-[15px] md:text-[15px] lg:text-[17px]">
                {cat.name}
              </h3>
            </div>

            <div className="flex flex-1 items-center justify-center rounded-b-xl bg-white py-4 pb-2">
              <Image
                src={cat.img}
                alt={cat.name}
                width={200}
                height={200}
                priority
                className="h-[81px] w-[165px] object-contain sm:h-28 sm:w-[198px] md:h-32 md:w-[198px] lg:h-36 lg:w-36 xl:h-40 xl:w-40"
              />
            </div>
          </div>
        </div>
      </Link>
    </div>
  ));

  return (
    <Section className="">
      <Container>
        <SectionTitle title="Top Category" />
        <div className="mt-4">
          <Slider
            cards={cards}
            slidesToShow={6}
            slidesToScroll={1}
            responsiveBreakpoints={{
              0: { slidesToShow: 2, slidesToScroll: 1 }, // ≥ 0 px → 2 cards
              480: { slidesToShow: 2.5, slidesToScroll: 1 }, // ≥ 480 px
              640: { slidesToShow: 3, slidesToScroll: 1 }, // ≥ 640 px
              768: { slidesToShow: 4, slidesToScroll: 1 }, // ≥ 768 px
              1024: { slidesToShow: 5, slidesToScroll: 1 }, // ≥ 1024 px
              1280: { slidesToShow: 6, slidesToScroll: 1 }, // ≥ 1280 px
            }}
            showArrows
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

export default FeaturedCategory;
