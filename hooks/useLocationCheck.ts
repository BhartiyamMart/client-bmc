import { useEffect, useRef } from 'react';
import { useLocationStore } from '@/stores/useLocation.store';

export const useLocationCheck = () => {
  const setShowLocationModal = useLocationStore((s) => s.setShowLocationModal);
  const hasChecked = useRef(false);

  useEffect(() => {
    // Prevent multiple checks
    if (hasChecked.current) return;

    // Check if Zustand has finished hydrating from localStorage
    const unsubscribe = useLocationStore.persist.onFinishHydration((state) => {
      if (hasChecked.current) return;

      const hasValidLocation = Boolean(
        state?.location?.lattitude?.trim() &&
          state?.location?.longitude?.trim() &&
          state?.location?.display_address?.trim()
      );

      if (!hasValidLocation) {
        setShowLocationModal(true);
      }

      hasChecked.current = true;
    });

    // Also check immediately if already hydrated
    if (useLocationStore.persist.hasHydrated()) {
      const state = useLocationStore.getState();

      const hasValidLocation = Boolean(
        state.location?.lattitude?.trim() &&
          state.location?.longitude?.trim() &&
          state.location?.display_address?.trim()
      );

      if (!hasValidLocation) {
        setShowLocationModal(true);
      }

      hasChecked.current = true;
    }

    return unsubscribe;
  }, [setShowLocationModal]); // Only setShowLocationModal dependency
};
