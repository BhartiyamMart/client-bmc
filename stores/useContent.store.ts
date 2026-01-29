import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import * as IContent from '@/interfaces/content.interface';

interface ContentState {
  categories: IContent.ICategoriesData[];
}

interface AddressActions {
  setCategories: (category: IContent.ICategoriesData[]) => void;
}

const initialState: ContentState = {
  categories: [],
};

export type ContentStore = ContentState & AddressActions;

export const useContentStore = create<ContentStore>()(
  persist(
    (set) => ({
      ...initialState,

      // Set all addresses (typically from API response)
      setCategories: (categories) => {
        set({ categories });
      },
    }),
    {
      name: 'content-storage',
    }
  )
);
