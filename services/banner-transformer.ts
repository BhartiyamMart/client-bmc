import { getBanners } from '@/apis/content.api';
import { BannersByTag, IBanner } from '@/interfaces/banner.interface';
import { transformBannerGroup, normalizeBannerTag } from '@/utils/banner-transformer';

export class BannerService {
  private static instance: BannerService;

  private constructor() {}

  static getInstance(): BannerService {
    if (!BannerService.instance) {
      BannerService.instance = new BannerService();
    }
    return BannerService.instance;
  }

  /**
   * Fetch all banners from API and organize by tag
   */
  async fetchAllBanners(): Promise<BannersByTag> {
    const banners: BannersByTag = {
      top: [],
      categoryBanner: [],
    };

    try {
      const response = await getBanners();

      if (!response.error && response.payload) {
        response.payload.banners.forEach((group) => {
          const normalizedTag = normalizeBannerTag(group.tag);

          if (normalizedTag) {
            const transformedBanners = transformBannerGroup(group);
            banners[normalizedTag] = transformedBanners;
          }
        });
      } else {
        console.warn('BannerService: Failed to fetch banners', response.message);
      }

      return banners;
    } catch (error) {
      console.error('BannerService: Error fetching banners', error);
      return banners;
    }
  }

  /**
   * Fetch banners by specific tag
   */
  async fetchBannersByTag(tag: string): Promise<IBanner[]> {
    try {
      const response = await getBanners();

      if (!response.error && response.payload) {
        const group = response.payload.banners.find((g) => g.tag.toUpperCase() === tag.toUpperCase());

        if (group) {
          return transformBannerGroup(group);
        }
      }

      return [];
    } catch (error) {
      console.error(`BannerService: Error fetching ${tag} banners`, error);
      return [];
    }
  }
}

export const bannerService = BannerService.getInstance();
