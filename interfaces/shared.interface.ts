import Link from 'next/link';
import { ComponentProps } from 'react';

export interface ILogoProps extends ComponentProps<typeof Link> {
  className?: string;
}

export interface ISearchProps {
  isMobile?: boolean;
}

export interface IPageLayoutProps {
  children: React.ReactNode;
}

export interface ISectionTitleProps {
  title: string;
}

export interface IBanner {
  id: string;
  title: string;
  priority: number;
  imageUrlSmall: string;
  imageUrlMedium?: string;
  imageUrlLarge: string;
  bannerUrl: string;
  description: string;
  tag: string;
}

export interface IBannerRES {
  banners: IBannerGroup[];
  totalTags: number;
  totalBanners: number;
}

export interface IBannerGroup {
  tag: string;
  banners: IBannerItem[];
  count: number;
}

export interface IBannerItem {
  id: string;
  title: string;
  priority: number;
  images: IBannerImages;
  bannerUrl: string;
  description: string;
}

export interface IBannerImages {
  small: string;
  medium: string;
  large: string;
}

export interface ICategory {
  id: number;
  name: string;
  link: string;
  img: string;
}

export interface IStoreType {
  title: string;
  img: string;
  para: string;
}

export interface ISplitFeatureProps {
  title: string;
  description: string;
  bullets?: string[];
  ctaLabel?: string;
  ctaLink?: string;
  image: string;
  onCtaClick?: () => void;
}

export interface IFaqData {
  question: string;
  answer: string;
}

export interface ISocialLinkData {
  href: string;
  label: string;
  svg: string;
}

export interface INavLinkData {
  href: string;
  label: string;
}
