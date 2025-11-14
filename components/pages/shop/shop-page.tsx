'use client';

import { useRef } from 'react';
import FooterBar from '@/components/shared/footer-bar';
import ShopNavbar from '@/components/shared/navbar/shop-navbar';
import FeaturedBanner from '@/components/pages/shop/featured-banner';
import ShopUtility from '@/components/shared/utility-bar/shop-utility';
import FeaturedCategory from '@/components/pages/shop/featured-category';

const ShopPage = () => {
  const navbarRef = useRef<HTMLElement>(null);

  return (
    <main className="">
      <ShopNavbar ref={navbarRef} />
      <ShopUtility navbarRef={navbarRef} />
      <FeaturedBanner />
      <FeaturedCategory />
      <FooterBar />
    </main>
  );
};

export default ShopPage;
