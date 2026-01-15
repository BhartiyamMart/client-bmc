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
    </>
  );
};

export default ShopLayout;
