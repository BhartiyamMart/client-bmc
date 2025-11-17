'use client';

import * as React from 'react';
import Autoplay from 'embla-carousel-autoplay';

import { Card, CardContent } from '@/components/ui/card';
import { Carousel, CarouselContent, CarouselItem } from '@/components/ui/carousel';
import Image from 'next/image';

// 👇 Your logo images (place them inside /public/logos/)
const logos = [
  { id: 1, src: '/images/partner-with-us/1.webp', alt: 'KitKat' },
  { id: 2, src: '/images/partner-with-us/2.webp', alt: 'Nestle' },
  { id: 3, src: '/images/partner-with-us/3.webp', alt: 'Parle-G' },
  { id: 4, src: '/images/partner-with-us/4.webp', alt: 'Maggi' },
  { id: 5, src: '/images/partner-with-us/5.webp', alt: 'Hershey' },
  { id: 6, src: '/images/partner-with-us/6.webp', alt: 'Snickers' },
  { id: 7, src: '/images/partner-with-us/7.webp', alt: 'Snickers' },
  { id: 8, src: '/images/partner-with-us/8.webp', alt: 'Snickers' },
  { id: 9, src: '/images/partner-with-us/9.webp', alt: 'Snickers' },
  { id: 10, src: '/images/partner-with-us/10.webp', alt: 'Snickers' },
  { id: 11, src: '/images/partner-with-us/11.webp', alt: 'Snickers' },
  { id: 12, src: '/images/partner-with-us/12.webp', alt: 'Snickers' },
  { id: 13, src: '/images/partner-with-us/13.webp', alt: 'Snickers' },
  { id: 14, src: '/images/partner-with-us/14.webp', alt: 'Snickers' },
  { id: 15, src: '/images/partner-with-us/15.webp', alt: 'Snickers' },
  { id: 16, src: '/images/partner-with-us/16.webp', alt: 'Snickers' },
  { id: 17, src: '/images/partner-with-us/17.webp', alt: 'Snickers' },
  { id: 18, src: '/images/partner-with-us/18.webp', alt: 'Snickers' },
  { id: 19, src: '/images/partner-with-us/19.webp', alt: 'Snickers' },
  { id: 20, src: '/images/partner-with-us/20.webp', alt: 'Snickers' },
  { id: 21, src: '/images/partner-with-us/21.webp', alt: 'Snickers' },
  { id: 22, src: '/images/partner-with-us/22.webp', alt: 'Snickers' },
  { id: 23, src: '/images/partner-with-us/23.webp', alt: 'Snickers' },
  { id: 24, src: '/images/partner-with-us/24.webp', alt: 'Snickers' },
];

export function LogosScroller() {
  const plugin = React.useRef(Autoplay({ delay: 2000, stopOnInteraction: true }));

  return (
    <Carousel
      plugins={[plugin.current]}
      className="mx-auto w-full max-w-6xl"
      onMouseEnter={plugin.current.stop}
      onMouseLeave={plugin.current.reset}
    >
      <CarouselContent>
        {logos.map((logo) => (
          <CarouselItem key={logo.id} className="basis-1/5">
            <Card className="border-0 shadow-none">
              <CardContent className="flex items-center justify-center p-2">
                <Image src={logo.src} alt={logo.alt} width={120} height={60} className="object-contain" />
              </CardContent>
            </Card>
          </CarouselItem>
        ))}
      </CarouselContent>
      {/* <CarouselPrevious />
      <CarouselNext /> */}
    </Carousel>
  );
}
