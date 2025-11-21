'use client';

import HomeHero from '@/components/home/home-hero';
import HomeAbout from '@/components/home/home-about';
import StoreTypes from '@/components/home/store-types';
import HomePartner from '@/components/home/home-partner';
import DownloadApp from '@/components/home/download-app';
import HomeContact from '@/components/home/home-contact';
import HomeServices from '@/components/home/home-services';
import PartnersLogos from '@/components/home/partners-logos';
import ProductCategories from '@/components/home/product-categories';

const Home = () => {
  return (
    <main>
      <HomeHero />
      <DownloadApp />
      <HomeAbout />
      <StoreTypes />
      <ProductCategories />
      <HomeServices />
      <HomePartner />
      <PartnersLogos />
      <HomeContact />
    </main>
  );
};

export default Home;
