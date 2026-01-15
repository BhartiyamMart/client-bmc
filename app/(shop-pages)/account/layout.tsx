'use client';
import Footer from '@/components/shared/footer/footer';
import ShopNavbar from '@/components/shared/navbar/shop-navbar';
import AccountLayout from '@/components/account-layout/account-layout';

import { IPageLayoutProps } from '@/interfaces/shared.interface';

export const dynamic = 'force-dynamic';

const PagesLayout: React.FC<IPageLayoutProps> = ({ children }) => {
  return (
    <main>
      {/* <ShopNavbar /> */}
      <AccountLayout>{children}</AccountLayout>
      <Footer />
    </main>
  );
};

export default PagesLayout;
