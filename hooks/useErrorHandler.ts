import { logger } from '@/lib/logger';
import { useCallback } from 'react';
import { ErrorResponse } from '@/interfaces/api.interface';

import toast from 'react-hot-toast';

interface ErrorHandlerOptions {
  component: string;
  action: string;
  showToast?: boolean;
  fallbackMessage?: string;
  metadata?: Record<string, unknown>;
}

export const useErrorHandler = () => {
  const handleError = useCallback((error: unknown, options: ErrorHandlerOptions) => {
    const apiError = error as ErrorResponse;
    logger.error(`${options.component}: ${options.action} failed`, {
      component: options.component,
      action: options.action,
      status: apiError.status,
      message: apiError.message,
    });
    if (options.showToast !== false) {
      toast.error(apiError.message || options.fallbackMessage || 'Something went wrong');
    }
    return {
      message: apiError.message,
      status: apiError.status,
    };
  }, []);
  return { handleError };
};
