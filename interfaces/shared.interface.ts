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
