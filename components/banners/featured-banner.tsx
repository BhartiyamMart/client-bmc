'use client';

import Link from 'next/link';
import OptimizedImage from '@/components/shared/optimizeImage';
import { useEffect, useState } from 'react';

// Swiper imports
import 'swiper/css';
import 'swiper/css/pagination';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay } from 'swiper/modules';
import { IBanner } from '@/interfaces/shared.interface';
import { getBanners } from '@/apis/content.api';
import Section from '@/components/shared/ui/section';
import Container from '@/components/shared/ui/container';
import FeaturedBannerSkeleton from './featured-bannerSkeleton';
import { useTopBanners } from '@/hooks/useBanners';

const FeaturedBanner = () => {
  const { banners, loading, error } = useTopBanners();

  if (loading) return <FeaturedBannerSkeleton dots={4} />;
  if (error || banners.length === 0) return null;

  return (
    <Section>
      <Container>
        <div className="relative">
          <Swiper
            modules={[Pagination, Autoplay]}
            autoplay={{
              delay: 4000,
              disableOnInteraction: false,
              pauseOnMouseEnter: true,
            }}
            loop={banners.length > 1}
            slidesPerView={1}
            spaceBetween={0}
            speed={300}
            pagination={{
              clickable: true,
              el: '.custom-pagination-dots',
            }}
            className="overflow-hidden rounded-[12px] lg:rounded-2xl"
          >
            {banners.map((banner) => (
              <SwiperSlide key={banner.id}>
                <Link href={banner.bannerUrl} className="block">
                  {/* Mobile/Tablet Image (< 1024px) - Aspect Ratio 2.58:1 */}
                  <div className="relative block w-full lg:hidden" style={{ aspectRatio: '2.58/1' }}>
                    <OptimizedImage
                      src={banner.imageUrlSmall}
                      alt={banner.title || 'Featured Banner'}
                      fill
                      className="rounded-[12px] object-cover select-none"
                      sizes="(max-width: 1024px) 100vw, 0px"
                      priority={banner.priority === 1}
                    />
                  </div>

                  {/* Desktop Image (>= 1024px) - Aspect Ratio 5.45:1 */}
                  <div className="relative hidden w-full lg:block" style={{ aspectRatio: '5.45/1' }}>
                    <OptimizedImage
                      src={banner.imageUrlLarge}
                      alt={banner.title || 'Featured Banner'}
                      fill
                      className="rounded-2xl object-cover select-none"
                      sizes="(min-width: 1024px) 100vw, 0px"
                      priority={banner.priority === 1}
                    />
                  </div>
                </Link>
              </SwiperSlide>
            ))}
          </Swiper>

          {/* Pagination Dots Below Banner */}
          {banners.length > 1 && <div className="custom-pagination-dots mt-3 flex items-center justify-center"></div>}
        </div>
      </Container>
    </Section>
  );
};

export default FeaturedBanner;
