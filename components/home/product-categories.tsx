import SplitFeature from '@/components/shared/split-feature';

const ProductCategories = () => {
  return (
    <SplitFeature
      title="Our Product Categories"
      description="At Bhartiyam, we offer a diverse portfolio of retail and FMCG products designed to meet the everyday needs of Indian households and businesses. From daily groceries to digital lifestyle essentials, our products combine quality, affordability, and reliability."
      bullets={[
        'Daily Essentials & Groceries',
        'Household & Kitchen Products',
        'Personal Care & Wellness',
        'Digital & Lifestyle Products',
      ]}
      ctaLabel="View More"
      ctaLink="/product-service"
      image="/images/heropage/766.webp"
    />
  );
};

export default ProductCategories;
