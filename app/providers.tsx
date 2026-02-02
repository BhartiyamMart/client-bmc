'use client';

import { ReactNode } from 'react';
import { GoogleMapsProvider } from '@/components/providers/google-maps-provider';

export function Providers({ children }: { children: ReactNode }) {
  return <GoogleMapsProvider>{children}</GoogleMapsProvider>;
}
