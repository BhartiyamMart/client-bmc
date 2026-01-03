'use client';

import { BannerProvider } from '@/contexts/banner.context';
import { ReactNode } from 'react';

export function Providers({ children }: { children: ReactNode }) {
  return <BannerProvider>{children}</BannerProvider>;
}
