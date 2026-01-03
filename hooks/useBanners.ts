import { useBannerContext } from '@/contexts/banner.context';
import { IBanner } from '@/interfaces/banner.interface';

interface BannerHookReturn {
  banners: IBanner[];
  loading: boolean;
  error: string | null;
  isInitialized: boolean;
}

interface UseBannersReturn {
  top: IBanner[];
  categoryBanner: IBanner[];
  loading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
  isInitialized: boolean;
}

/**
 * Hook to get all banners
 */
export const useBanners = (): UseBannersReturn => {
  const { top, categoryBanner, loading, error, refetchBanners, isInitialized } = useBannerContext();

  return {
    top,
    categoryBanner,
    loading,
    error,
    refetch: refetchBanners,
    isInitialized,
  };
};

/**
 * Hook to get TOP banners (Featured/Hero banners)
 */
export const useTopBanners = (): BannerHookReturn => {
  const { top, loading, error, isInitialized } = useBannerContext();
  return {
    banners: top,
    loading,
    error,
    isInitialized,
  };
};

/**
 * Hook to get BOTTOM_CATEGORIES banners
 */
export const useCategoryBanners = (): BannerHookReturn => {
  const { categoryBanner, loading, error, isInitialized } = useBannerContext();
  return {
    banners: categoryBanner,
    loading,
    error,
    isInitialized,
  };
};
