'use client';
import ProductCard from '@/components/cards/product-card';
import Container from '@/components/shared/ui/container';
import Section from '@/components/shared/ui/section';
import Slider from '@/components/shared/ui/slider';
import { productData } from '@/data/temp';
import React from 'react';

const Similar = () => {
  // Filter products by category using exact string match
  const getProductsByCategory = (categoryType: string) => {
    return productData.filter((product) => product.category === categoryType);
  };

  // Get products for each section using the new category values
  const similarProducts = getProductsByCategory('SIMILAR_PRODUCT');
  const top10Products = getProductsByCategory('TOP_10');
  const peopleAlsoBoughtProducts = getProductsByCategory('PEOPLE_ALSO_BOUGHT');

  // Convert ProductCard to the format expected by Slider
  const renderProductSlider = (title: string, products: typeof productData) => {
    // Don't render if no products found for this category
    if (products.length === 0) {
      return null;
    }

    return (
      <Section>
        <Container>
          <div className="pt-4">
            <h2 className="mb-5 text-3xl font-semibold">{title}</h2>
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
                      isFavorite={false}
                      // onAdd={() => console.log('Added', product.name)}
                      // onShare={() => console.log('Share', product.name)}
                    />
                  </div>
                ))}
                slidesToShow={5}
                slidesToScroll={1}
                responsiveBreakpoints={{
                  0: { slidesToShow: 2, slidesToScroll: 1 }, // Mobile: 2 cards
                  480: { slidesToShow: 2.5, slidesToScroll: 1 }, // Large mobile: 2.5 cards
                  640: { slidesToShow: 3, slidesToScroll: 1 }, // Small tablet: 3 cards
                  768: { slidesToShow: 3.5, slidesToScroll: 1 }, // Medium tablet: 3.5 cards
                  1024: { slidesToShow: 4, slidesToScroll: 1 }, // Desktop: 4 cards
                  1280: { slidesToShow: 5, slidesToScroll: 1 }, // Large desktop: 5 cards
                }}
                showArrows
                showDots={false}
                infinite={false}
                autoPlay={false}
                className="-mx-2"
                cardClassName="h-full"
              />
            </div>
          </div>
        </Container>
      </Section>
    );
  };

  return (
    <div>
      {/* Similar Products - only shows products with 'SIMILAR_PRODUCT' category */}
      {renderProductSlider('Similar Products', similarProducts)}

      {/* Top 10 - only shows products with 'TOP_10' category */}
      {renderProductSlider('Top 10', top10Products)}

      {/* People also bought - only shows products with 'PEOPLE_ALSO_BOUGHT' category */}
      {renderProductSlider('People Also Bought', peopleAlsoBoughtProducts)}
    </div>
  );
};

export default Similar;
