'use client';

import { useRef } from 'react';

import BestSellerPicks from './best-seller-picks';
import Footer from '@/components/shared/footer/footer';
import FooterBar from '@/components/shared/footer/footer-bar';
import ShopNavbar from '@/components/shared/navbar/shop-navbar';
import FeaturedBanner from '@/components/banners/featured-banner';
import FeaturedCategory from '@/components/pages/shop/featured-category';
import ShopUtility from '@/components/shared/ui/utility-bar/shop-utility';
import LimitedOffer from './limited-offer';
import CategoryBanner from '@/components/banners/category-banner';
import SpecialDiscounts from './special-discounts';

const ShopPage = () => {
  const navbarRef = useRef<HTMLElement>(null);
  return (
    <main className="">
      <ShopNavbar ref={navbarRef} />
      <ShopUtility navbarRef={navbarRef} />
      <FeaturedBanner />
      <FeaturedCategory />
      <BestSellerPicks />
      <LimitedOffer />
      <CategoryBanner />
      <SpecialDiscounts />
      <FooterBar />
      <Footer />
    </main>
  );
};

export default ShopPage;
