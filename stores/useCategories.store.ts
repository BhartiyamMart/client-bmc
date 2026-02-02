import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import * as IContent from '@/interfaces/content.interface';
import { fetchAllCategories } from '@/apis/content.api';

interface CategoriesState {
  categories: IContent.ICategoriesData[];
  isLoading: boolean;
  isInitialized: boolean;
  error: string | null;
  lastFetched: number | null;
  expiresAt: number | null;
}

interface CategoriesActions {
  setCategories: (categories: IContent.ICategoriesData[]) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  fetchCategories: (forceRefresh?: boolean) => Promise<void>;
  clearCategories: () => void;
  isExpired: () => boolean;
}

const initialState: CategoriesState = {
  categories: [],
  isLoading: false,
  isInitialized: false,
  error: null,
  lastFetched: null,
  expiresAt: null,
};

// Cache expiry time: 5 minutes (adjust as needed)
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes in milliseconds

export type CategoriesStore = CategoriesState & CategoriesActions;

export const useCategoriesStore = create<CategoriesStore>()(
  persist(
    (set, get) => ({
      ...initialState,

      // Set categories with timestamp
      setCategories: (categories) => {
        const now = Date.now();
        set({
          categories,
          isLoading: false,
          isInitialized: true,
          error: null,
          lastFetched: now,
          expiresAt: now + CACHE_DURATION,
        });
      },

      // Set loading state
      setLoading: (loading) => {
        set({ isLoading: loading });
      },

      // Set error state
      setError: (error) => {
        set({ error, isLoading: false });
      },

      // Check if cache is expired
      isExpired: () => {
        const { expiresAt } = get();
        if (!expiresAt) return true;
        return Date.now() > expiresAt;
      },

      // Fetch categories from API
      fetchCategories: async (forceRefresh = false) => {
        const { categories, isLoading, isExpired } = get();

        // Skip if already loading
        if (isLoading) return;

        // Skip if cache is valid and not forcing refresh
        if (!forceRefresh && categories.length > 0 && !isExpired()) {
          return;
        }

        set({ isLoading: true, error: null });

        try {
          const response = await fetchAllCategories();

          if (response.status === 200 && response.payload?.categories) {
            get().setCategories(response.payload.categories);
          } else {
            get().setError('Failed to fetch categories');
          }
        } catch (error) {
          console.error('Error fetching categories:', error);
          get().setError(error instanceof Error ? error.message : 'Unknown error');
        } finally {
          set({ isLoading: false });
        }
      },

      // Clear categories
      clearCategories: () => {
        set(initialState);
      },
    }),
    {
      name: 'categories-storage',
      partialize: (state) => ({
        categories: state.categories,
        lastFetched: state.lastFetched,
        expiresAt: state.expiresAt,
        isInitialized: state.isInitialized,
      }),
    }
  )
);
