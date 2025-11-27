'use client';

import OptimizedImage from '@/components/shared/optimizeImage';
import Autoplay from 'embla-carousel-autoplay';

import { useRef } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Carousel, CarouselContent, CarouselItem } from '@/components/ui/carousel';
import { storeLogos } from '@/data/shared/landing-store';

export function LogosScroller() {
  const plugin = useRef(Autoplay({ delay: 2000, stopOnInteraction: true }));

  return (
    <Carousel
      plugins={[plugin.current]}
      className="mx-auto w-full max-w-[1530px]"
      onMouseEnter={plugin.current.stop}
      onMouseLeave={plugin.current.reset}
    >
      <CarouselContent>
        {storeLogos.map((logo) => (
          <CarouselItem key={logo.id} className="basis-1/5">
            <Card className="border-0 shadow-none">
              <CardContent className="flex items-center justify-center p-2">
                <OptimizedImage src={logo.src} alt={logo.alt} width={140} height={70} className="object-contain" />
              </CardContent>
            </Card>
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  );
}
