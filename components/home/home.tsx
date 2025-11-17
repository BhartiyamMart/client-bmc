'use client';

import NavbarHero from '@/components/home/navbar-hero';
import DownloadApp from '@/components/home/download-app';
import HomeAbout from '@/components/home/home-about';
import StoreTypes from '@/components/home/store-types';
import HomeProductCategories from '@/components/home/home-product-categories';
import HomeServices from '@/components/home/home-services';
import HomePartner from '@/components/home/home-partner';
import PartnersLogos from './partners-logos';
import HomeContact from '@/components/home/home-contact';
const Home = () => {
  return (
    <>
      <NavbarHero />
      <DownloadApp />
      <HomeAbout />
      <StoreTypes />
      <HomeProductCategories />
      <HomeServices />
      <HomePartner />
      <PartnersLogos />
      <HomeContact />
    </>
  );
};

export default Home;
