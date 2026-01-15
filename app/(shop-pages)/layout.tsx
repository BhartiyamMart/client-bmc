import Footer from '@/components/shared/footer/footer';
import ShopNavbar from '@/components/shared/navbar/shop-navbar';
import React from 'react';

export interface ShopPagesLayout {
  children: React.ReactNode;
}

const ShopLayout = ({ children }: ShopPagesLayout) => {
  return (
    <>
      <ShopNavbar />
      {children}
      <Footer />
    </>
  );
};

export default ShopLayout;
