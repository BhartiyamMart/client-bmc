'use client';

import HomeAbout from '@/components/home/home-about';
import NavbarHero from '@/components/home/navbar-hero';
import StoreTypes from '@/components/home/store-types';
import HomePartner from '@/components/home/home-partner';
import DownloadApp from '@/components/home/download-app';
import HomeContact from '@/components/home/home-contact';
import HomeServices from '@/components/home/home-services';
import PartnersLogos from '@/components/home/partners-logos';
import HomeProductCategories from '@/components/home/product-categories';

const Home = () => {
  return (
    <main>
      <NavbarHero />
      <DownloadApp />
      <HomeAbout />
      <StoreTypes />
      <HomeProductCategories />
      <HomeServices />
      <HomePartner />
      <PartnersLogos />
      <HomeContact />
    </main>
  );
};

export default Home;
