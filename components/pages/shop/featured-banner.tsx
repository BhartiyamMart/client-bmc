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
import FeaturedBannerSkeleton from './featured-bannerSkeleton';
import Section from '@/components/shared/ui/section';
import Container from '@/components/shared/ui/container';

const FeaturedBanner = () => {
  const [banners, setBanners] = useState<IBanner[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBanners = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await getBanners();

        if (!response.error && response.payload) {
          const topBannerGroup = response.payload.banners.find((group) => group.tag.toUpperCase() === 'TOP');

          if (topBannerGroup && topBannerGroup.banners.length > 0) {
            const transformedBanners: IBanner[] = topBannerGroup.banners
              .filter((banner) => {
                const hasValidImage = banner.images.small && banner.images.large;
                return hasValidImage;
              })
              .map((banner) => ({
                id: banner.id,
                title: banner.title,
                priority: banner.priority,
                imageUrlSmall: banner.images.small || '',
                imageUrlLarge: banner.images.large || '',
                bannerUrl: banner.bannerUrl.startsWith('/') ? banner.bannerUrl : `/${banner.bannerUrl}`,
                description: banner.description,
                tag: topBannerGroup.tag,
              }))
              .sort((a, b) => a.priority - b.priority);

            setBanners(transformedBanners);
          } else {
            if (process.env.NODE_ENV === 'development') {
              console.log('No TOP banners found in response');
            }
          }
        } else {
          const errorMessage = response.message || 'Failed to load banners';
          if (process.env.NODE_ENV === 'development') {
            console.log('Banner API error:', errorMessage, response.error);
          }
          setError(errorMessage);
        }
      } catch (err) {
        if (process.env.NODE_ENV === 'development') {
          const errorMessage = err instanceof Error ? err.message : 'Unknown error occurred';
          console.error('Error fetching banners:', errorMessage);
        }
        setError('Failed to load banners');
      } finally {
        setLoading(false);
      }
    };

    fetchBanners();
  }, []);

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
