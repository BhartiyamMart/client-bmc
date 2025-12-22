import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface FavoritesStore {
  favoriteIds: number[];
  toggleFavorite: (productId: number) => void;
  isFavorite: (productId: number) => boolean;
  clearFavorites: () => void;
}

export const useFavoritesStore = create<FavoritesStore>()(
  persist(
    (set, get) => ({
      favoriteIds: [],

      // Toggle favorite status
      toggleFavorite: (productId) => {
        const favoriteIds = get().favoriteIds;
        if (favoriteIds.includes(productId)) {
          // Remove from favorites
          set({ favoriteIds: favoriteIds.filter((id) => id !== productId) });
        } else {
          // Add to favorites
          set({ favoriteIds: [...favoriteIds, productId] });
        }
      },

      // Check if product is favorited
      isFavorite: (productId) => {
        return get().favoriteIds.includes(productId);
      },

      // Clear all favorites
      clearFavorites: () => set({ favoriteIds: [] }),
    }),
    {
      name: 'favorites-storage', // localStorage key
    }
  )
);
