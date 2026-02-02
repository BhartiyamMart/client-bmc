import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import * as IContent from '@/interfaces/catalog.interface';
import { fetchAllCategories } from '@/apis/catalog.api';

interface CategoriesState {
  categories: IContent.ICategoriesData[];
  isLoading: boolean;
  isInitialized: boolean;
  error: string | null;
  lastFetched: number | null;
  expiresAt: number | null;
  expandedCategories: Set<number>;
  allExpanded: boolean;
}

interface CategoriesActions {
  setCategories: (categories: IContent.ICategoriesData[]) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  fetchCategories: (forceRefresh?: boolean) => Promise<void>;
  clearCategories: () => void;
  isExpired: () => boolean;

  expandCategory: (id: number) => void;
  collapseCategory: (id: number) => void;
  toggleCategory: (id: number) => void;
  toggleExpandAll: () => void;

  buildCategoryPath: (category: IContent.ICategoriesData, parentPath?: string) => string;
}

const initialState: CategoriesState = {
  categories: [],
  isLoading: false,
  isInitialized: false,
  error: null,
  lastFetched: null,
  expiresAt: null,
  expandedCategories: new Set(),
  allExpanded: false,
};

const CACHE_DURATION = 5 * 60 * 1000;

export type CategoriesStore = CategoriesState & CategoriesActions;

export const useCategoriesStore = create<CategoriesStore>()(
  persist(
    (set, get) => ({
      ...initialState,

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

      setLoading: (loading) => {
        set({ isLoading: loading });
      },

      setError: (error) => {
        set({ error, isLoading: false });
      },

      isExpired: () => {
        const { expiresAt } = get();
        if (!expiresAt) return true;
        return Date.now() > expiresAt;
      },

      fetchCategories: async (forceRefresh = false) => {
        const { categories, isLoading, isExpired } = get();

        if (isLoading) return;

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

      clearCategories: () => {
        set(initialState);
      },

      expandCategory: (id) => {
        set((state) => ({
          expandedCategories: new Set([...state.expandedCategories, id]),
        }));
      },

      collapseCategory: (id) => {
        set((state) => {
          const newExpanded = new Set(state.expandedCategories);
          newExpanded.delete(id);
          return { expandedCategories: newExpanded };
        });
      },

      toggleCategory: (id) => {
        const { expandedCategories } = get();
        if (expandedCategories.has(id)) {
          get().collapseCategory(id);
        } else {
          get().expandCategory(id);
        }
      },

      toggleExpandAll: () => {
        const { allExpanded } = get();

        if (allExpanded) {
          set({ expandedCategories: new Set(), allExpanded: false });
        } else {
          const getAllIds = (cats: IContent.ICategoriesData[]): number[] => {
            let ids: number[] = [];
            cats.forEach((cat) => {
              ids.push(Number(cat.id));
              const children = cat.children || cat.subcategories || [];
              if (children.length > 0) {
                ids = [...ids, ...getAllIds(children)];
              }
            });
            return ids;
          };

          const allIds = getAllIds(get().categories);
          set({ expandedCategories: new Set(allIds), allExpanded: true });
        }
      },

      // Simplified path building - parent path is passed during recursion
      buildCategoryPath: (category, parentPath = '') => {
        if (parentPath) {
          return `${parentPath}/${category.slug}`;
        }
        return `/pc/${category.slug}`;
      },
    }),
    {
      name: 'categories-storage',
      partialize: (state) => ({
        categories: state.categories,
        lastFetched: state.lastFetched,
        expiresAt: state.expiresAt,
        isInitialized: state.isInitialized,
        expandedCategories: Array.from(state.expandedCategories),
        allExpanded: state.allExpanded,
      }),
      merge: (persistedState: any, currentState) => {
        return {
          ...currentState,
          ...persistedState,
          expandedCategories: new Set(persistedState?.expandedCategories || []),
          allExpanded: persistedState?.allExpanded || false,
        };
      },
    }
  )
);
