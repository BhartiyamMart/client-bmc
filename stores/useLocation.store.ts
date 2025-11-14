import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { ILocation } from '@/interfaces/location.interface';

interface ILocationStore {
  location: ILocation | null;
  showLocationModal: boolean;
  setLocation: (location: ILocation) => void;
  setShowLocationModal: (show: boolean) => void;
  clearLocation: () => void;
}

export const useLocationStore = create<ILocationStore>()(
  persist(
    (set) => ({
      location: null,
      showLocationModal: false,

      setLocation: (location: ILocation) =>
        set({
          location,
          showLocationModal: false,
        }),

      setShowLocationModal: (show: boolean) => set({ showLocationModal: show }),

      clearLocation: () =>
        set({
          location: null,
          showLocationModal: true,
        }),
    }),
    {
      name: 'location-storage',
      partialize: (state) => ({
        location: state.location,
      }),
    }
  )
);
