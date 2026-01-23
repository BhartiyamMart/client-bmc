import { getBanners } from '@/apis/content.api';
import { BannersByTag, IBanner } from '@/interfaces/content.interface';
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

  // async fetchAllBanners(): Promise<BannersByTag> {
  //   const banners: BannersByTag = {
  //     top: [],
  //     categoryBanner: [],
  //   };

  //   try {
  //     const response = await getBanners();
  //     console.log('response', response);

  //     if (!response.error && response.payload) {
  //       // Group banners by tag manually
  //       response.payload.forEach((banner: IBanner) => {
  //         const normalizedTag = normalizeBannerTag(banner.tag);

  //         if (normalizedTag) {
  //           banners[normalizedTag].push(banner);
  //         }
  //       });

  //       // Sort each group by priority
  //       banners.top.sort((a, b) => a.priority - b.priority);
  //       banners.categoryBanner.sort((a, b) => a.priority - b.priority);
  //     }

  //     return banners;
  //   } catch (error) {
  //     console.error('BannerService: Error fetching banners', error);
  //     return banners;
  //   }
  // }

  /**
   * Fetch banners by specific tag
   */
  // async fetchBannersByTag(tag: string): Promise<IBanner[]> {
  //   try {
  //     const response = await getBanners();

  //     if (!response.error && response.payload) {
  //       const group = response.payload.payload.find((g) => g.tag.toUpperCase() === tag.toUpperCase());

  //       if (group) {
  //         return transformBannerGroup(group);
  //       }
  //     }

  //     return [];
  //   } catch (error) {
  //     console.error(`BannerService: Error fetching ${tag} banners`, error);
  //     return [];
  //   }
  // }
}

export const bannerService = BannerService.getInstance();
