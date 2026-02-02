import { useEffect } from 'react';
import { useCategoriesStore } from '@/stores/useCategories.store';

interface UseCategoriesOptions {
  autoFetch?: boolean;
  forceRefresh?: boolean;
  refetchInterval?: number;
}

export const useCategories = (options: UseCategoriesOptions = {}) => {
  const { autoFetch = true, forceRefresh = false, refetchInterval } = options;

  const error = useCategoriesStore((state) => state.error);
  const categories = useCategoriesStore((state) => state.categories);
  const isLoading = useCategoriesStore((state) => state.isLoading);
  const isInitialized = useCategoriesStore((state) => state.isInitialized);
  const fetchCategories = useCategoriesStore((state) => state.fetchCategories);
  const isExpired = useCategoriesStore((state) => state.isExpired);

  useEffect(() => {
    if (autoFetch) {
      fetchCategories(forceRefresh);
    }
  }, [autoFetch, forceRefresh, fetchCategories]);

  useEffect(() => {
    if (!refetchInterval) return;

    const intervalId = setInterval(() => {
      if (isExpired()) {
        fetchCategories();
      }
    }, refetchInterval);

    return () => clearInterval(intervalId);
  }, [refetchInterval, isExpired, fetchCategories]);

  return {
    categories,
    isLoading,
    isInitialized,
    error,
    fetchCategories,
    isExpired: isExpired(),
  };
};
