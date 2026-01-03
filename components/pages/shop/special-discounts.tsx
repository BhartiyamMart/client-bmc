'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Container from '@/components/shared/ui/container';
import Section from '@/components/shared/ui/section';
import SectionTitle from '@/components/shared/ui/section-title';
import { discountData } from '@/data/temp';

const SpecialDiscounts = () => {
  const discounts = discountData;
  const [imageErrors, setImageErrors] = useState<Record<number, boolean>>({});

  if (discounts.length === 0) return null;

  const handleImageError = (id: number) => {
    setImageErrors((prev) => ({ ...prev, [id]: true }));
  };

  return (
    <Section>
      <Container>
        <SectionTitle title="Special Discounts" />

        <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6">
          {discounts.map((discount) => (
            <Link
              key={discount.id}
              href={discount.link || '#'}
              className="group flex flex-col justify-between rounded-xl border border-gray-200 bg-white p-3 transition-all duration-300 hover:shadow sm:p-4"
            >
              <div className="rounded-lg bg-linear-to-r from-gray-100 to-white p-2 text-center sm:p-3">
                <h3 className="text-xs font-semibold wrap-break-word text-gray-800 sm:text-sm md:text-base lg:text-lg">
                  {discount.title}
                </h3>
                <p className="text-xs font-bold wrap-break-word sm:text-sm md:text-base lg:text-lg">
                  {discount.subtitle}
                </p>
              </div>

              <div className="mt-3 flex flex-1 items-center justify-center">
                {imageErrors[discount.id] ? (
                  <div className="flex h-30 w-30 items-center justify-center rounded-lg bg-gray-100 sm:h-37.5 sm:w-37.5 md:h-45 md:w-45 lg:h-55 lg:w-55">
                    <span className="text-xs text-gray-400 sm:text-sm">No Image</span>
                  </div>
                ) : (
                  <div className="relative h-30 w-30 transition-transform duration-300 group-hover:scale-105 sm:h-37.5 sm:w-37.5 md:h-45 md:w-45 lg:h-55 lg:w-55">
                    <Image
                      src={discount.img}
                      alt={discount.title}
                      fill
                      className="object-contain"
                      sizes="(max-width: 640px) 120px, (max-width: 768px) 150px, (max-width: 1024px) 180px, 220px"
                      priority={discount.id === 1}
                      onError={() => handleImageError(discount.id)}
                    />
                  </div>
                )}
              </div>
            </Link>
          ))}
        </div>
      </Container>
    </Section>
  );
};

export default SpecialDiscounts;
