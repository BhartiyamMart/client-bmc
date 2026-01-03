'use client';

import Link from 'next/link';
import Image from 'next/image';
import { createPortal } from 'react-dom';
import { useState, useEffect } from 'react';
import { IProduct } from '@/interfaces/product.interface';
import { useCartStore, useCartQuantity, useTotalProductQuantity } from '@/stores/useCart.store';
import { useFavoritesStore } from '@/stores/useFavorites.store';
import ProductVariantsModal from '../modals/product-variants-modal';

const ProductCard: React.FC<IProduct> = ({
  id,
  name,
  weight,
  price,
  oldPrice,
  image,
  deliveryTime,
  label,
  labelValue,
  variants,
  stock,
}) => {
  const [isMounted, setIsMounted] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const productId = typeof id === 'string' ? parseInt(id) : id;
  const hasVariants = Boolean(variants && variants.length > 0);

  // YE SELECTOR HOOKS USE KARO - YE AUTOMATIC RE-RENDER KARENGE!
  const baseQuantity = useCartQuantity(productId, undefined);
  const totalQuantity = hasVariants ? useTotalProductQuantity(productId) : baseQuantity;

  // Actions from store
  const addToCart = useCartStore((state) => state.addToCart);
  const removeFromCart = useCartStore((state) => state.removeFromCart);
  const showPopCartTemporary = useCartStore((state) => state.showPopCartTemporary);

  const { toggleFavorite, isFavorite } = useFavoritesStore();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const favoriteStatus = isMounted ? isFavorite(productId) : false;

  const isOutOfStock =
    (stock !== undefined && stock <= 0) || (hasVariants && !variants?.some((v) => (v.stock ?? 1) > 0));

  const handleFavoriteToggle = () => {
    toggleFavorite(productId);
  };

  const handleAddToCart = () => {
    if (isOutOfStock) return;
    if (hasVariants) {
      setIsModalOpen(true);
    } else {
      addToCart(productId, undefined, { name, weight, price, image });
      showPopCartTemporary();
    }
  };

  const handleIncreaseQuantity = () => {
    if (isOutOfStock) return;
    addToCart(productId, undefined, { name, weight, price, image });
    showPopCartTemporary();
  };

  const handleDecreaseQuantity = () => {
    removeFromCart(productId, undefined);
    showPopCartTemporary();
  };

  const handleVariantModalClick = () => {
    if (isOutOfStock) return;
    setIsModalOpen(true);
  };

  return (
    <>
      <div className="relative flex h-full flex-col overflow-hidden rounded-xl border border-gray-200 bg-white duration-200">
        {label && labelValue && (
          <div className="relative">
            <div
              className="absolute top-0 left-0 z-10 flex flex-col items-center justify-center bg-left bg-no-repeat text-[12px] font-semibold text-white"
              style={{
                backgroundImage: 'url(/image/badg.svg)',
                backgroundSize: 'contain',
                width: '40px',
                height: '40px',
              }}
            >
              <span className="leading-none">{label}</span>
              <span className="leading-none">₹{labelValue}</span>
            </div>
          </div>
        )}

        <div className="p-3">
          <Link href={`/product/${id}`} className="block">
            <div className="mb-1 flex h-50 items-center justify-center sm:h-45 md:h-54 lg:h-60">
              <Image
                src={image}
                alt={name || 'product'}
                width={10000000}
                height={10000000}
                className="h-full cursor-pointer object-contain"
                priority={false}
              />
            </div>
          </Link>

          <div className="mb-1 h-4">
            {deliveryTime && (
              <div className="flex w-full items-center justify-between">
                <p className="text-xs font-semibold text-gray-500">{weight}</p>
                <div className="flex w-fit items-center gap-1 rounded border border-gray-200 bg-gray-50 px-1.5 py-0.5">
                  <Image
                    src="/image/clock2.svg"
                    alt="Delivery time"
                    width={10}
                    height={10}
                    className="h-3 w-3 pb-0.5"
                  />
                  <span className="text-[10px] font-semibold text-[#000000]">{deliveryTime}</span>
                </div>
              </div>
            )}
          </div>

          <div className="h-[38px] pt-1.5">
            <h3 className="line-clamp-2 text-[14px] leading-5 font-normal text-gray-800 md:text-[14px] lg:text-[15px]">
              <Link href={`/product/${id}`} className="hover:text-gray-600">
                {name}
              </Link>
            </h3>
          </div>

          <div className="mb-1 flex items-center justify-between md:mt-1.5">
            <div className="h-7 items-baseline gap-2">
              <span className="text-[12px] font-semibold text-gray-900 md:text-[16px] lg:text-[22px]">₹{price}</span>
              {oldPrice && oldPrice > price && (
                <span className="ml-2 text-sm text-gray-400 line-through">₹{oldPrice}</span>
              )}
            </div>
            {/* {stock !== undefined && !hasVariants && (
              <span className={`text-[11px] font-semibold ${stock > 0 ? 'text-green-600' : 'text-red-500'}`}>
                {stock > 0 ? `${stock} in stock` : 'Out of stock'}
              </span>
            )} */}
          </div>

          <div className="grow" />

          <div className="mt-auto">
            {!isMounted ? (
              <button
                disabled
                className="w-full rounded-md border border-gray-300 bg-gray-100 py-2.5 text-sm font-semibold text-gray-400"
              >
                Loading...
              </button>
            ) : isOutOfStock ? (
              <div className="flex items-center gap-2">
                <FavoriteButton isFavorite={favoriteStatus} onToggle={handleFavoriteToggle} />
                <button
                  disabled
                  className="flex-1 cursor-not-allowed rounded-sm border border-gray-300 bg-gray-100 py-2.5 text-sm font-medium text-gray-400"
                >
                  Out of stock
                </button>
              </div>
            ) : totalQuantity > 0 ? (
              hasVariants ? (
                <div className="flex w-full items-center justify-between">
                  <FavoriteButton isFavorite={favoriteStatus} onToggle={handleFavoriteToggle} />
                  <div className="flex h-10 w-[80%] items-center justify-between rounded-md bg-[#F0701E] text-white">
                    <button
                      onClick={handleVariantModalClick}
                      className="flex h-full w-10 cursor-pointer items-center justify-center rounded-l-md text-lg font-bold hover:bg-orange-600"
                    >
                      −
                    </button>
                    <button onClick={handleVariantModalClick} className="px-2 text-sm font-semibold">
                      {totalQuantity}
                    </button>
                    <button
                      onClick={handleVariantModalClick}
                      className="flex h-full w-10 cursor-pointer items-center justify-center rounded-r-md text-lg font-bold hover:bg-orange-600"
                    >
                      +
                    </button>
                  </div>
                </div>
              ) : (
                <div className="flex w-full items-center justify-between">
                  <FavoriteButton isFavorite={favoriteStatus} onToggle={handleFavoriteToggle} />
                  <div className="flex h-10 w-[80%] items-center rounded-sm bg-[#F0701E] text-white">
                    <button
                      onClick={handleDecreaseQuantity}
                      className="flex h-full w-10 cursor-pointer items-center justify-center rounded-l-md text-lg font-bold hover:bg-orange-600"
                      aria-label="Decrease quantity"
                    >
                      −
                    </button>
                    <span className="flex flex-1 items-center justify-center text-sm font-semibold">
                      {totalQuantity}
                    </span>
                    <button
                      onClick={handleIncreaseQuantity}
                      className="flex h-full w-10 cursor-pointer items-center justify-center rounded-r-md text-lg font-bold hover:bg-orange-600"
                      aria-label="Increase quantity"
                    >
                      +
                    </button>
                  </div>
                </div>
              )
            ) : (
              <div className="flex items-start gap-2">
                <FavoriteButton isFavorite={favoriteStatus} onToggle={handleFavoriteToggle} />
                <div className="mt-2 flex w-full flex-col">
                  <button
                    onClick={handleAddToCart}
                    className="flex-1 cursor-pointer rounded-sm border border-orange-500 bg-orange-50 py-2.5 text-sm font-medium text-orange-600 transition-colors hover:bg-orange-100"
                  >
                    Add
                  </button>
                  <div className="mt-2 flex h-4 justify-center text-center">
                    {hasVariants && <span className="text-xs text-gray-500">{variants?.length} variants</span>}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {hasVariants &&
          isMounted &&
          isModalOpen &&
          createPortal(
            <ProductVariantsModal
              isOpen={isModalOpen}
              onClose={() => setIsModalOpen(false)}
              title={name}
              products={variants || []}
              mainProductId={productId}
            />,
            document.body
          )}
      </div>
    </>
  );
};

const FavoriteButton: React.FC<{ isFavorite: boolean; onToggle: () => void }> = ({ isFavorite, onToggle }) => (
  <button
    onClick={onToggle}
    className="flex cursor-pointer items-center justify-center rounded-sm p-2"
    aria-label="Toggle favorite"
  >
    <svg width="36" height="41" viewBox="0 0 36 41" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="0.388141" y="0.388141" width="35.2237" height="39.2237" rx="5.21572" fill="white" />
      <rect
        x="0.388141"
        y="0.388141"
        width="35.2237"
        height="39.2237"
        rx="5.21572"
        stroke="#333333"
        strokeWidth="0.776283"
      />
      <path
        d="M12.791 7.46484H23.209C24.4934 7.46497 25.535 8.50656 25.5352 9.79102V27.0947C25.5352 27.9266 24.5596 28.3317 23.9697 27.8174L23.8574 27.7021L19.1143 21.666C18.5475 20.9447 17.4508 20.9565 16.9004 21.6904L14.6279 24.7207L14.6211 24.7295L12.6152 27.5381C12.3927 27.8496 12.0332 28.0352 11.6504 28.0352C10.9959 28.0351 10.4649 27.5041 10.4648 26.8496V9.79102C10.465 8.50656 11.5066 7.46497 12.791 7.46484Z"
        fill={isFavorite ? '#F0701E' : 'transparent'}
        stroke={isFavorite ? '#F0701E' : '#6b7280'}
        strokeWidth="0.930417"
      />
    </svg>
  </button>
);

export default ProductCard;
