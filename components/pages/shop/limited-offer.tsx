'use client';

import { useEffect, useState } from 'react';
import { IProduct } from '@/interfaces/product.interface';
import { productData } from '@/data/temp';
import LimitedOfferSkeleton from './limited-offerSkeleton';
import Section from '@/components/shared/ui/section';
import Container from '@/components/shared/ui/container';
import SectionTitle from '@/components/shared/ui/section-title';
import Slider from '@/components/shared/ui/slider';
import ProductCard from '@/components/cards/product-card';

const LimitedOffer = () => {
  const [products, setProducts] = useState<IProduct[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const limitedProducts = productData.slice(0, 8);
        setProducts(limitedProducts);
      } catch (err) {
        console.error('Error fetching limited offer products:', err);
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) {
    return <LimitedOfferSkeleton />;
  }

  if (products.length === 0) {
    return null;
  }

  return (
    <Section className="">
      <Container>
        <div className="mb-4">
          <SectionTitle title="Limited Stock" />
        </div>

        <div className="mt-5">
          <Slider
            cards={products.map((product) => (
              <div key={product.id} className="px-2">
                <ProductCard
                  id={product.id}
                  name={product.name}
                  weight={product.weight}
                  price={product.price}
                  oldPrice={product.oldPrice}
                  discount={product.discount}
                  image={product.image}
                  deliveryTime={product.deliveryTime}
                  label={product.label}
                  labelValue={product.labelValue}
                  category={product.category}
                  variants={product.variants}
                />
              </div>
            ))}
            slidesToShow={4}
            slidesToScroll={1}
            responsiveBreakpoints={{
              0: { slidesToShow: 1, slidesToScroll: 1 },
              480: { slidesToShow: 2, slidesToScroll: 1 },
              640: { slidesToShow: 2.5, slidesToScroll: 1 },
              768: { slidesToShow: 3, slidesToScroll: 1 },
              1024: { slidesToShow: 3.5, slidesToScroll: 1 },
              1200: { slidesToShow: 4, slidesToScroll: 1 },
              1400: { slidesToShow: 5, slidesToScroll: 1 },
            }}
            showArrows={true}
            showDots={false}
            autoPlay={true}
            autoPlayInterval={10000}
            infinite={false}
            className="-mx-2"
            cardClassName="h-full"
          />
        </div>
      </Container>
    </Section>
  );
};

export default LimitedOffer;
