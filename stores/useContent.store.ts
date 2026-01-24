import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import * as IContent from '@/interfaces/content.interface';

// ✅ Address data interface (from your API response)

// ✅ Address state
interface ContentState {
  categories: IContent.ICategoriesData[];
}

// ✅ Address actions
interface AddressActions {
  setCategories: (category: IContent.ICategoriesData[]) => void;
}

// ✅ Initial state
const initialState: ContentState = {
  categories: [],
};

// ✅ Combined type
export type ContentStore = ContentState & AddressActions;

// ✅ Create address store with persist
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
