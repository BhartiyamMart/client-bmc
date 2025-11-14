import FooterBar from '@/components/shared/footer-bar';
import ShopNavbar from '@/components/shared/navbar/shop-navbar';
import FeaturedBanner from '@/components/pages/shop/featured-banner';
import ShopUtility from '@/components/shared/utility-bar/shop-utility';
import FeaturedCategory from '@/components/pages/shop/featured-category';

const ShopPage = () => {
  return (
    <main className="">
      <ShopNavbar />
      <ShopUtility />
      <FeaturedBanner />
      <FeaturedCategory />
      <FooterBar />
    </main>
  );
};

export default ShopPage;
