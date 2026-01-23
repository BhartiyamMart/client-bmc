'use client';

import { createContext, useContext, useState, useEffect, ReactNode, useCallback } from 'react';
import { BannersByTag } from '@/interfaces/content.interface';
import { bannerService } from '@/services/banner-transformer';

interface BannerContextType extends BannersByTag {
  loading: boolean;
  error: string | null;
  refetchBanners: () => Promise<void>;
  isInitialized: boolean;
}

const BannerContext = createContext<BannerContextType | undefined>(undefined);

export const BannerProvider = ({ children }: { children: ReactNode }) => {
  const [banners, setBanners] = useState<BannersByTag>({
    top: [],
    categoryBanner: [],
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isInitialized, setIsInitialized] = useState(false);

  const fetchBanners = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const fetchedBanners = await bannerService.fetchAllBanners();
      console.log("fetchedBanners ", fetchBanners)
      setBanners(fetchedBanners);
      setIsInitialized(true);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to load banners';
      console.error('BannerContext: Error fetching banners', errorMessage);
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchBanners();
  }, [fetchBanners]);

  return (
    <BannerContext.Provider
      value={{
        ...banners,
        loading,
        error,
        refetchBanners: fetchBanners,
        isInitialized,
      }}
    >
      {children}
    </BannerContext.Provider>
  );
};

export const useBannerContext = () => {
  const context = useContext(BannerContext);
  if (context === undefined) {
    throw new Error('useBannerContext must be used within a BannerProvider');
  }
  return context;
};
