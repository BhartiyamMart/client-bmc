'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useEffect, useState } from 'react';

// Swiper imports
import 'swiper/css';
import 'swiper/css/pagination';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay } from 'swiper/modules';
import { IBanner } from '@/interfaces/shared.interface';
import { getBanners } from '@/apis/content.api';
import FeaturedBannerSkeleton from './featured-bannerSkeleton';
import Section from '@/components/shared/section';
import Container from '@/components/shared/container';
import { Skeleton } from '@/components/ui/skeleton';

const FeaturedBanner = () => {
  const [banners, setBanners] = useState<IBanner[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [imageErrors, setImageErrors] = useState<Record<string, boolean>>({});

  useEffect(() => {
    const fetchBanners = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await getBanners();

        if (!response.error && response.payload) {
          // Find the TOP tag group
          const topBannerGroup = response.payload.banners.find((group) => group.tag.toUpperCase() === 'TOP');

          if (topBannerGroup && topBannerGroup.banners.length > 0) {
            // Transform and validate API structure
            const transformedBanners: IBanner[] = topBannerGroup.banners
              .filter((banner) => {
                // Filter out banners with all empty image URLs
                const hasValidImage = banner.images.small || banner.images.medium || banner.images.large;
                return hasValidImage;
              })
              .map((banner) => ({
                id: banner.id,
                title: banner.title,
                priority: banner.priority,
                imageUrlSmall: banner.images.small || '',
                imageUrlMedium: banner.images.medium || '',
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
          console.error('Error fetching banners:', {
            message: errorMessage,
            error: err,
            stack: err instanceof Error ? err.stack : undefined,
          });
        }
        setError('Failed to load banners');
      } finally {
        setLoading(false);
      }
    };

    fetchBanners();
  }, []);

  const handleImageError = (bannerId: string, imageType: 'small' | 'medium' | 'large') => {
    const errorKey = `${bannerId}-${imageType}`;
    setImageErrors((prev) => ({ ...prev, [errorKey]: true }));
  };

  const isImageError = (bannerId: string, imageType: 'small' | 'medium' | 'large') => {
    const errorKey = `${bannerId}-${imageType}`;
    return imageErrors[errorKey] || false;
  };

  if (loading) return <FeaturedBannerSkeleton dots={4} />;
  if (error || banners.length === 0) return null;

  return (
    <Section>
      <Container>
        <div className="relative">
          <Swiper
            modules={[Pagination, Autoplay]}
            autoplay={{ delay: 4000, disableOnInteraction: false }}
            loop={banners.length > 1}
            slidesPerView={1}
            spaceBetween={0}
            centeredSlides={false}
            pagination={{
              clickable: true,
              el: '.custom-swiper-pagination',
              renderBullet: (index, className) =>
                `<span class="${className} w-2! h-2! mx-1.5! bg-gray-300! opacity-70! rounded-full! transition-all! duration-300! cursor-pointer! hover:scale-110!"></span>`,
            }}
            className="overflow-hidden rounded-[13px] md:rounded-2xl [&_.swiper-wrapper]:ease-out!"
          >
            {banners.map((banner) => (
              <SwiperSlide key={banner.id}>
                <Link href={banner.bannerUrl} className="block">
                  <div className="relative w-full overflow-hidden rounded-[13px] md:rounded-2xl">
                    {/* Mobile Image (< 640px) */}
                    <div className="relative block sm:hidden">
                      {!banner.imageUrlSmall || isImageError(banner.id, 'small') ? (
                        <div className="relative aspect-407/176 w-full overflow-hidden rounded-[13px] bg-gray-50">
                          <Skeleton className="absolute inset-0 h-full w-full" />
                        </div>
                      ) : (
                        <Image
                          src={banner.imageUrlSmall}
                          alt={banner.title || 'Featured Banner'}
                          width={407}
                          height={176}
                          className="h-auto w-full rounded-[13px] object-cover select-none"
                          sizes="(max-width: 640px) 100vw"
                          priority={banner.priority === 1}
                          onError={() => handleImageError(banner.id, 'small')}
                        />
                      )}
                    </div>

                    {/* Tablet Image (640px - 1024px) */}
                    <div className="relative hidden sm:block lg:hidden">
                      {!banner.imageUrlMedium || isImageError(banner.id, 'medium') ? (
                        <div className="relative aspect-992/408 w-full overflow-hidden rounded-2xl bg-gray-50">
                          <Skeleton className="absolute inset-0 h-full w-full" />
                        </div>
                      ) : (
                        <Image
                          src={banner.imageUrlMedium}
                          alt={banner.title || 'Featured Banner'}
                          width={992}
                          height={408}
                          className="h-auto w-full rounded-2xl object-cover"
                          sizes="(min-width: 640px) and (max-width: 1024px) 100vw"
                          priority={banner.priority === 1}
                          onError={() => handleImageError(banner.id, 'medium')}
                        />
                      )}
                    </div>

                    {/* Desktop Image (>= 1024px) */}
                    <div className="relative hidden lg:block">
                      {!banner.imageUrlLarge || isImageError(banner.id, 'large') ? (
                        <div className="relative aspect-1531/408 w-full overflow-hidden rounded-2xl bg-gray-50">
                          <Skeleton className="absolute inset-0 h-full w-full" />
                        </div>
                      ) : (
                        <Image
                          src={banner.imageUrlLarge}
                          alt={banner.title || 'Featured Banner'}
                          width={1531}
                          height={408}
                          className="h-auto w-full rounded-2xl object-cover"
                          sizes="(min-width: 1024px) 100vw"
                          priority={banner.priority === 1}
                          onError={() => handleImageError(banner.id, 'large')}
                        />
                      )}
                    </div>
                  </div>
                </Link>
              </SwiperSlide>
            ))}
          </Swiper>

          {/* Custom Pagination - Only show if more than one banner */}
          {banners.length > 1 && (
            <div className="custom-swiper-pagination mt-4 flex items-center justify-center py-2.5 [&_.swiper-pagination-bullet-active]:scale-125! [&_.swiper-pagination-bullet-active]:bg-orange-500! [&_.swiper-pagination-bullet-active]:opacity-100!"></div>
          )}
        </div>
      </Container>
    </Section>
  );
};

export default FeaturedBanner;
