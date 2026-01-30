'use client';

import Link from 'next/link';
import Section from '@/components/shared/ui/section';
import Container from '@/components/shared/ui/container';
import OptimizedImage from '@/components/shared/optimizeImage';
import FeaturedBannerSkeleton from './featured-bannerSkeleton';

// Swiper imports
import 'swiper/css';
import 'swiper/css/pagination';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay } from 'swiper/modules';
import { useEffect, useState } from 'react';
import { ApiResponse } from '@/interfaces/api.interface';
import toast from 'react-hot-toast';
import { getBanners } from '@/apis/content.api';
import { IBanner } from '@/interfaces/content.interface';

const FeaturedBanner = () => {
  const [banners, setBanners] = useState<IBanner[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTopBanner = async (tag: string) => {
      try {
        setLoading(true);
        const response = await getBanners(tag);
        if (response.status === 200) {
          setBanners(response.payload);
        } else {
          toast.error(response.message);
        }
      } catch (error: unknown) {
        const apiError = error as ApiResponse<IBanner[]>;
        toast.error(apiError.message || 'Failed to fetch banners');
      } finally {
        setLoading(false);
      }
    };

    fetchTopBanner('TOP_SLIDER');
  }, []); // Added dependency array to run only once

  if (loading) return <FeaturedBannerSkeleton dots={4} />;
  if (banners.length === 0) return null;

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
            {banners.map((banner) => {
              const BannerContent = () => (
                <>
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
                </>
              );

              return (
                <SwiperSlide key={banner.id}>
                  {banner.bannerUrl ? (
                    <Link href={banner.bannerUrl} className="block">
                      <BannerContent />
                    </Link>
                  ) : (
                    <div className="block cursor-default">
                      <BannerContent />
                    </div>
                  )}
                </SwiperSlide>
              );
            })}
          </Swiper>

          {/* Pagination Dots Below Banner */}
          {banners.length > 1 && <div className="custom-pagination-dots mt-3 flex items-center justify-center"></div>}
        </div>
      </Container>
    </Section>
  );
};

export default FeaturedBanner;
