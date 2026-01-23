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

export type IBannerRES = IBanner[];

// Frontend Transformed Interface
export interface IBanner {
  id: string;
  title: string;
  priority: number;
  imageUrlSmall: string;
  imageUrlLarge: string;
  bannerUrl?: string;
  // description: string;
  tag: string;
}

// Organized Banners by Tag
export interface BannersByTag {
  top: IBanner[];
  categoryBanner: IBanner[];
}

export interface ISubCategoryData {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  imageUrl: string | null;
  priority: number;
  depth: number;
  parentId: string | null;
  hasParent: boolean;
  hasChildren: boolean;
  childrenCount: number;
  subcategories: ISubCategoryData[];
}

export interface ICategoriesData {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  imageUrl: string | null;
  priority: number;
  depth: number;
  parentId: string | null;
  hasParent: boolean;
  hasChildren: boolean;
  childrenCount: number;
  subcategories: ISubCategoryData[]; // recursive children
}

export interface ICategoryFetchRES {
  total: number;
  categories: ICategoriesData[];
}
