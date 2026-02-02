// API Request Interface
export interface IBannerRequest {
  tag?: string;
  format?: 'flat' | 'nested';
}

// Single Banner Interface
export interface IBanner {
  id: string;
  title: string;
  tag: string;
  priority: number;
  imageUrlSmall: string;
  imageUrlLarge: string;
  bannerUrl?: string;
}

// API Response - Direct Array (what you're actually getting)
export type IBannerResponse = IBanner[];

// Alternative format (if API changes to nested)
export interface IBannerFlatResponse {
  banners: IBanner[];
  total: number;
}
