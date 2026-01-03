import { MenuItem } from '@/data/account-menu';

/**
 * Normalize path by removing trailing slash
 */
export const normalizePath = (path: string): string => {
  return path.endsWith('/') && path.length > 1 ? path.slice(0, -1) : path;
};

/**
 * Check if a route is currently active
 */
export const isActiveRoute = (pathname: string, item: MenuItem): boolean => {
  const normalizedPath = normalizePath(pathname);

  if (item.exactMatch) {
    return normalizedPath === normalizePath(item.href);
  }

  if (item.activePatterns?.length) {
    return item.activePatterns.some((pattern) => {
      const regex = new RegExp(`^${normalizePath(pattern)}`);
      return regex.test(normalizedPath);
    });
  }

  return normalizedPath.startsWith(normalizePath(item.href));
};

/**
 * Extract last segment from pathname
 */
export const getLastSegment = (path: string): string => {
  const segments = path.split('/').filter(Boolean);
  return segments[segments.length - 1] || '';
};

/**
 * Extract order ID from pathname
 */
export const getOrderIdFromPath = (path: string): string => {
  const segments = path.split('/').filter(Boolean);
  if (segments.includes('orders') && segments.length > 2) {
    const lastSegment = segments[segments.length - 1];
    if (/^[A-Z0-9]+$/i.test(lastSegment) && lastSegment.length > 5) {
      return lastSegment;
    }
  }
  return '';
};
