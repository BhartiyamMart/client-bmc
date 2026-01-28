import Footer from '@/components/shared/footer/footer';
import ShopNavbar from '@/components/shared/navbar/shop-navbar';
import { IPageLayoutProps } from '@/interfaces/shared.interface';

const ShopLayout = ({ children }: IPageLayoutProps) => {
  return (
    <div className="flex min-h-screen flex-col">
      <ShopNavbar />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
};

export default ShopLayout;
