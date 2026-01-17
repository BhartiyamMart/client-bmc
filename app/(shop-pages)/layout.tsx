import Footer from '@/components/shared/footer/footer';
import ShopNavbar from '@/components/shared/navbar/shop-navbar';

import { IPageLayoutProps } from '@/interfaces/shared.interface';

const ShopLayout = ({ children }: IPageLayoutProps) => {
  return (
    <>
      <ShopNavbar />
      {children}
      <Footer />
    </>
  );
};

export default ShopLayout;
