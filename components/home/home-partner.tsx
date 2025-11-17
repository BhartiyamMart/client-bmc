import { SplitFeature } from '@/components/home/split-feature';

const HomePartner = () => {
  return (
    <SplitFeature
      title="Partners With Us - Bhartiyam "
      description="At Bhartiyam, We Believe in the Power of Collaboration. We are a Fast Moving Consumer Goods (FMCG) brand in India. We look forward to building strong, long-term partnerships with suppliers, distributors, manufacturers, and business associates who share our vision for quality, affordability, and customer satisfaction. "
      bullets={[
        'A strong and expanding customer base across India.',
        'Omni-channel presence with online and offline retail formats.',
        'Trusted brand reputation under Kamna Mart Private Limited.',
        'Growth opportunities in one of the fastest-growing FMCG sectors.',
        'A partnership built on transparency, innovation, and mutual success. ',
      ]}
      ctaLabel="View More"
      ctaLink="/partner-bhartiyam"
      image="/images/partner-with-us/p_img01.webp"
    />
  );
};

export default HomePartner;
