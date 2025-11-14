import ShopNavbar from '@/components/shared/navbar/shop-navbar';
import { IPageLayoutProps } from '@/interfaces/shared.interface';

export const dynamic = 'force-dynamic';

const PagesLayout: React.FC<IPageLayoutProps> = ({ children }) => {
  return (
    <main>
      <ShopNavbar />
      {children}
    </main>
  );
};

export default PagesLayout;
