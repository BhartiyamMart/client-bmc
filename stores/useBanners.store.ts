import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import * as IContent from '@/interfaces/content.interface';
import { getBanners } from '@/apis/content.api';

interface BannersState {
  banners: IContent.IBanner[];
  isLoading: boolean;
  isInitialized: boolean;
  error: string | null;
  lastFetched: number | null;
  expiresAt: number | null;
}

interface BannersActions {
  setBanners: (banners: IContent.IBanner[]) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  fetchBanners: (forceRefresh?: boolean) => Promise<void>;
  getBannersByTag: (tag: string) => IContent.IBanner[];
  clearBanners: () => void;
  isExpired: () => boolean;
}

const initialState: BannersState = {
  banners: [],
  isLoading: false,
  isInitialized: false,
  error: null,
  lastFetched: null,
  expiresAt: null,
};

const CACHE_DURATION = 10 * 60 * 1000; // 10 minutes

export type BannersStore = BannersState & BannersActions;

export const useBannersStore = create<BannersStore>()(
  persist(
    (set, get) => ({
      ...initialState,

      setBanners: (banners) => {
        const now = Date.now();
        console.log('Setting banners:', banners); // Debug log
        set({
          banners,
          isLoading: false,
          isInitialized: true,
          error: null,
          lastFetched: now,
          expiresAt: now + CACHE_DURATION,
        });
      },

      setLoading: (loading) => set({ isLoading: loading }),

      setError: (error) => set({ error, isLoading: false }),

      isExpired: () => {
        const { expiresAt } = get();
        if (!expiresAt) return true;
        return Date.now() > expiresAt;
      },

      fetchBanners: async (forceRefresh = false) => {
        const { banners, isLoading, isExpired } = get();

        if (isLoading) return;

        if (!forceRefresh && banners.length > 0 && !isExpired()) {
          console.log('Using cached banners:', banners); // Debug log
          return;
        }

        set({ isLoading: true, error: null });

        try {
          console.log('Fetching banners from API...'); // Debug log
          const response = await getBanners({ format: 'flat' });

          console.log('API Response:', response); // Debug log

          if (response.status === 200 && response.payload) {
            // Response payload is direct array, not nested
            const bannersArray = Array.isArray(response.payload)
              ? response.payload
              : (response.payload as IContent.IBannerFlatResponse).banners || [];

            console.log('Extracted banners:', bannersArray); // Debug log
            get().setBanners(bannersArray);
          } else {
            get().setError(response.message || 'Failed to fetch banners');
          }
        } catch (error: any) {
          console.error('Error fetching banners:', error);
          get().setError(error?.message || 'Unknown error');
        }
      },

      getBannersByTag: (tag: string) => {
        const { banners } = get();
        const filtered = banners.filter((banner) => banner.tag === tag).sort((a, b) => a.priority - b.priority);
        console.log(`Banners for tag "${tag}":`, filtered); // Debug log
        return filtered;
      },

      clearBanners: () => set(initialState),
    }),
    {
      name: 'banners-storage',
      partialize: (state) => ({
        banners: state.banners,
        lastFetched: state.lastFetched,
        expiresAt: state.expiresAt,
        isInitialized: state.isInitialized,
      }),
    }
  )
);
