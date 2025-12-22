'use client';

import Link from 'next/link';
import Slider from '@/components/shared/ui/slider';
import Section from '@/components/shared/ui/section';
import Container from '@/components/shared/ui/container';
import BestSellerSkeleton from './best-seller-picksSkeleton';

import { productData } from '@/data/temp';
import { useEffect, useState } from 'react';
import { IProduct } from '@/interfaces/product.interface';
import ProductCard from '@/components/cards/product-card';

const BestSellerPicks = () => {
  const [products, setProducts] = useState<IProduct[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const bestSellerProducts = productData.slice(0, 8);
        setProducts(bestSellerProducts);
      } catch (err) {
        console.error('Error fetching best seller products:', err);
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) {
    return <BestSellerSkeleton />;
  }

  if (products.length === 0) {
    return null;
  }

  return (
    <Section className="">
      <Container>
        <section className="bg-primary-light w-full rounded-xl py-5">
          <div className="mx-auto flex flex-col gap-6 px-4 lg:flex-row lg:items-center lg:gap-4">
            {/* Text Section - Reduced width */}
            <div className="flex w-full shrink-0 flex-col items-center justify-center lg:ml-5 lg:w-[280px] lg:items-start xl:w-[300px]">
              <h2 className="text-left text-2xl font-semibold text-black lg:text-2xl xl:text-3xl">Best Seller Picks</h2>
              <p className="mt-3 text-center text-lg leading-snug text-black lg:mt-5 lg:max-w-[250px] lg:text-left lg:text-xl">
                Best Sellers That Fill Every Basket
              </p>
              <Link
                href="/category/best-sellers"
                className="mt-5 inline-block rounded-md bg-[#FFFFFF] px-7 py-3 text-base font-bold text-[#F07D00] transition"
              >
                BUY NOW
              </Link>
            </div>

            {/* Slider Section - Takes remaining space */}
            <div className="w-full lg:min-w-0 lg:flex-1">
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
                autoPlay={true}
                autoPlayInterval={10000}
                showDots={false}
                showArrows={true}
                infinite={false}
                className="w-full"
                cardClassName="h-full"
                responsiveBreakpoints={{
                  0: { slidesToShow: 1, slidesToScroll: 1 },
                  480: { slidesToShow: 1.5, slidesToScroll: 1 },
                  640: { slidesToShow: 2, slidesToScroll: 1 },
                  768: { slidesToShow: 2.5, slidesToScroll: 1 },
                  1024: { slidesToShow: 3, slidesToScroll: 1 }, // slidesToScroll is integer
                  1200: { slidesToShow: 3.5, slidesToScroll: 1 },
                  1400: { slidesToShow: 4, slidesToScroll: 1 },
                }}
              />
            </div>
          </div>
        </section>
      </Container>
    </Section>
  );
};

export default BestSellerPicks;
