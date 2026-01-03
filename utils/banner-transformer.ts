import { IBanner, IBannerItem, IBannerGroup } from '@/interfaces/banner.interface';

/**
 * Transform single banner item from API format to Frontend format
 */
export const transformBannerItem = (item: IBannerItem, tag: string): IBanner => {
  return {
    id: item.id,
    title: item.title,
    description: item.description,
    priority: item.priority,
    imageUrlSmall: item.images.small,
    imageUrlLarge: item.images.large,
    bannerUrl: item.bannerUrl.startsWith('/') ? item.bannerUrl : `/${item.bannerUrl}`,
    tag,
  };
};

/**
 * Transform banner group and sort by priority
 */
export const transformBannerGroup = (group: IBannerGroup): IBanner[] => {
  return group.banners
    .filter((banner) => banner.images.small && banner.images.large)
    .map((banner) => transformBannerItem(banner, group.tag))
    .sort((a, b) => a.priority - b.priority);
};

/**
 * Normalize banner tag to camelCase
 */
export const normalizeBannerTag = (tag: string): keyof import('@/interfaces/banner.interface').BannersByTag | null => {
  const tagMap: Record<string, keyof import('@/interfaces/banner.interface').BannersByTag> = {
    TOP: 'top',
    BOTTOM_CATEGORIES: 'categoryBanner',
  };

  const normalizedTag = tagMap[tag.toUpperCase()];

  if (!normalizedTag) {
    console.warn(`Unknown banner tag: ${tag}`);
    return null;
  }

  return normalizedTag;
};
