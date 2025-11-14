import ShopNavbar from '@/components/shared/navbar/shop-navbar';
import ShopUtility from '@/components/shared/utility-bar/shop-utility';
import FeaturedBanner from './featured-banner';
import FeaturedCategory from './featured-category';
import FooterBar from '@/components/shared/footer-bar';

const ShopPage = () => {
  return (
    <main className="">
      <ShopNavbar />
      <ShopUtility />
      {/* <FeaturedBanner />
      <FeaturedCategory /> */}
      <FooterBar />
    </main>
  );
};

export default ShopPage;
