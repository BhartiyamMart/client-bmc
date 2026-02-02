'use client';

import Image from 'next/image';
import Link from 'next/link';
import Section from '../shared/ui/section';
import Container from '../shared/ui/container';
import { useCategoryBanners } from '@/hooks/useBanner';
import CategoryBannerSkeleton from './category-bannerSkeleton';

const CategoryBanner = () => {
  const { banners, isLoading, isInitialized } = useCategoryBanners();

  // Show skeleton only on first load
  if (isLoading && !isInitialized) {
    return <CategoryBannerSkeleton />;
  }

  // Don't render if no banners
  if (isInitialized && banners.length === 0) {
    return null;
  }

  return (
    <Section>
      <Container>
        {/* Desktop Grid */}
        <div className="hidden w-full grid-cols-3 gap-4 lg:grid">
          {banners.slice(0, 3).map((banner, index) => (
            <Link key={banner.id} href={banner.bannerUrl || '#'} className="group block">
              <div className="relative aspect-3/2 w-full overflow-hidden rounded-sm transition-transform duration-300 group-hover:scale-[1.02]">
                <Image
                  src={banner.imageUrlSmall}
                  alt={banner.title}
                  fill
                  className="object-cover"
                  sizes="(min-width: 1024px) 33vw, 100vw"
                  priority={index === 0}
                  quality={85}
                />
              </div>
            </Link>
          ))}
        </div>

        {/* Mobile Horizontal Scroll */}
        <div className="scrollbar-hide flex w-full snap-x snap-mandatory gap-4 overflow-x-auto lg:hidden">
          {banners.slice(0, 3).map((banner, index) => (
            <Link key={banner.id} href={banner.bannerUrl || '#'} className="w-[90%] shrink-0 snap-center sm:w-[48%]">
              <div className="relative aspect-3/2 w-full overflow-hidden rounded-sm">
                <Image
                  src={banner.imageUrlSmall}
                  alt={banner.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 640px) 90vw, 48vw"
                  priority={index === 0}
                  quality={85}
                />
              </div>
            </Link>
          ))}
        </div>
      </Container>
    </Section>
  );
};

export default CategoryBanner;
