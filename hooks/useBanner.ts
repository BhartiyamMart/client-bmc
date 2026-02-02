import { useEffect } from 'react';
import { useBannersStore } from '@/stores/useBanners.store';

interface UseBannersOptions {
  tag?: string;
  autoFetch?: boolean;
  forceRefresh?: boolean;
}

export const useBanners = (options: UseBannersOptions = {}) => {
  const { tag, autoFetch = true, forceRefresh = false } = options;

  const allBanners = useBannersStore((state) => state.banners);
  const isLoading = useBannersStore((state) => state.isLoading);
  const isInitialized = useBannersStore((state) => state.isInitialized);
  const error = useBannersStore((state) => state.error);
  const fetchBanners = useBannersStore((state) => state.fetchBanners);
  const getBannersByTag = useBannersStore((state) => state.getBannersByTag);

  useEffect(() => {
    if (autoFetch) {
      console.log('Auto-fetching banners...'); // Debug log
      fetchBanners(forceRefresh);
    }
  }, [autoFetch, forceRefresh, fetchBanners]);

  const banners = tag ? getBannersByTag(tag) : allBanners;

  return {
    banners,
    isLoading,
    isInitialized,
    error,
    fetchBanners,
  };
};

// Convenience hooks
export const useTopBanners = () => useBanners({ tag: 'TOP_SLIDER' });
export const useCategoryBanners = () => useBanners({ tag: 'CATEGORY_BANNER' });
export const useOfferBanners = () => useBanners({ tag: 'OFFER_BANNER' });
