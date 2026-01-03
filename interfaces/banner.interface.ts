// API Response Interfaces
export interface IBannerImages {
  small: string;
  large: string;
}

export interface IBannerItem {
  id: string;
  title: string;
  priority: number;
  images: IBannerImages;
  bannerUrl: string;
  description: string;
}

export interface IBannerGroup {
  tag: string;
  banners: IBannerItem[];
  count: number;
}

export interface IBannerPayload {
  banners: IBannerGroup[];
  totalTags: number;
  totalBanners: number;
}

export interface IBannerRES {
  error: boolean;
  status: number;
  message: string;
  payload: IBannerPayload;
}

// Frontend Transformed Interface
export interface IBanner {
  id: string;
  title: string;
  priority: number;
  imageUrlSmall: string;
  imageUrlLarge: string;
  bannerUrl: string;
  description: string;
  tag: string;
}

// Organized Banners by Tag
export interface BannersByTag {
  top: IBanner[];
  categoryBanner: IBanner[];
}
