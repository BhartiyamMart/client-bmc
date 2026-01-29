'use client';

import { ReactNode } from 'react';
import { GoogleMapsProvider } from '@/components/providers/google-maps-provider';
import { BannerProvider } from '@/contexts/banner.context';

export function Providers({ children }: { children: ReactNode }) {
  return (
    <GoogleMapsProvider>
      <BannerProvider>{children}</BannerProvider>
    </GoogleMapsProvider>
  );
}
