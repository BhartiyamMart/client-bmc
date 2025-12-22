// components/modals/product-variants-modal.tsx
'use client';

import { useEffect } from 'react';
import Image from 'next/image';
import { IProductVariant } from '@/interfaces/product.interface';
import { useCartStore, useCartQuantity } from '@/stores/useCart.store';
import { CloseIcon } from '../shared/svg/svg-icon';

interface ProductVariantsModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  products: IProductVariant[];
  mainProductId: number;
}

// YE SEPARATE COMPONENT BANAO TAAKI HAR VARIANT APNA QUANTITY TRACK KARE
const VariantItem: React.FC<{
  product: IProductVariant;
  mainProductId: number;
  onAdd: () => void;
  onRemove: () => void;
  onPlus: () => void;
}> = ({ product, mainProductId, onAdd, onRemove, onPlus }) => {
  // YE HOOK AUTOMATIC RE-RENDER KAREGA JAB IS VARIANT KI QUANTITY CHANGE HOGI
  const quantity = useCartQuantity(mainProductId, product.id);
  const outOfStock = product.stock !== undefined && product.stock <= 0;

  return (
    <div className="relative flex items-start rounded-xl border border-gray-200 bg-white p-3 shadow-sm transition-shadow hover:shadow-md sm:p-4">
      {/* Discount tag */}
      {product.discount && (
        <div className="absolute bottom-0 left-0 z-10 rounded-bl-lg bg-green-600 px-2 py-1 text-xs font-medium text-white shadow-sm">
          {product.discount}
        </div>
      )}

      {/* Content */}
      <div className="flex w-full items-start justify-between gap-3">
        {/* Left: image + text */}
        <div className="flex min-w-0 flex-1 items-start gap-3">
          <div className="shrink-0">
            <Image
              src={product.image}
              alt={product.name}
              width={64}
              height={64}
              className="h-14 w-14 rounded-lg border border-gray-200 bg-gray-50 object-contain sm:h-16 sm:w-16"
            />
          </div>

          <div className="flex min-w-0 flex-1 flex-col pt-1">
            <h3 className="mb-1 text-sm leading-tight font-medium text-gray-900 sm:text-base">{product.name}</h3>
            <p className="mb-1 text-xs text-gray-500 sm:text-sm">{product.weight}</p>
          </div>
        </div>

        {/* Right: price + actions */}
        <div className="flex shrink-0 flex-col items-end gap-2">
          <div className="text-right">
            <p className="text-base font-semibold text-gray-900 sm:text-lg">₹{product.price}</p>
            {product.oldPrice && product.oldPrice > product.price && (
              <p className="-mt-1 text-xs text-gray-400 line-through sm:text-sm">₹{product.oldPrice}</p>
            )}
            {/* {product.stock !== undefined && (
              <p className={`mt-1 text-xs font-semibold ${outOfStock ? 'text-red-500' : 'text-green-600'}`}>
                {outOfStock ? 'Out of stock' : `${product.stock} in stock`}
              </p>
            )} */}
          </div>

          {/* Buttons */}
          {quantity > 0 && !outOfStock ? (
            <div className="flex items-center overflow-hidden rounded-lg">
              <button
                className="flex h-8 w-8 cursor-pointer items-center justify-center bg-[#F0701E] font-medium text-white transition-colors hover:bg-orange-600 sm:h-9 sm:w-9"
                onClick={onRemove}
                aria-label="Decrease quantity"
              >
                −
              </button>
              <span className="min-w-8 bg-[#F0701E] px-3 py-1.5 text-center text-sm font-medium text-white sm:py-2">
                {quantity}
              </span>
              <button
                className="flex h-8 w-8 cursor-pointer items-center justify-center bg-[#F0701E] font-medium text-white transition-colors hover:bg-orange-600 sm:h-9 sm:w-9"
                onClick={onPlus}
                aria-label="Increase quantity"
              >
                +
              </button>
            </div>
          ) : (
            <button
              className="min-w-16 cursor-pointer rounded-lg border border-[#F0701E] bg-orange-50 px-4 py-2 text-sm font-medium text-[#F0701E] transition-colors hover:bg-orange-100 disabled:cursor-not-allowed disabled:opacity-50"
              onClick={onAdd}
              aria-label={`Add ${product.name} to cart`}
              disabled={outOfStock}
            >
              {outOfStock ? 'Out of stock' : 'Add'}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default function ProductVariantsModal({
  isOpen,
  onClose,
  title,
  products,
  mainProductId,
}: ProductVariantsModalProps) {
  const addToCart = useCartStore((state) => state.addToCart);
  const removeFromCart = useCartStore((state) => state.removeFromCart);
  const showPopCartTemporary = useCartStore((state) => state.showPopCartTemporary);

  // Lock body scroll when modal open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const handleAddClick = (variant: IProductVariant) => {
    if (variant.stock !== undefined && variant.stock <= 0) return;

    addToCart(mainProductId, variant.id, {
      name: variant.name,
      weight: variant.weight,
      price: variant.price,
      image: variant.image,
    });
    showPopCartTemporary();
  };

  const handleRemoveClick = (variantId: number) => {
    removeFromCart(mainProductId, variantId);
    showPopCartTemporary();
  };

  const handlePlusClick = (variant: IProductVariant) => {
    if (variant.stock !== undefined && variant.stock <= 0) return;

    addToCart(mainProductId, variant.id, {
      name: variant.name,
      weight: variant.weight,
      price: variant.price,
      image: variant.image,
    });
    showPopCartTemporary();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
      {/* Modal container */}
      <div className="max-h-[85vh] w-full max-w-sm overflow-hidden rounded-2xl bg-white shadow-lg sm:max-w-md lg:max-w-lg">
        {/* Header */}
        <div className="flex items-center justify-between border-b px-4 pt-3 pb-5 sm:px-6 sm:pt-6">
          <h2 className="truncate pr-2 text-lg font-semibold text-gray-900 sm:text-xl">{title}</h2>
          <button
            onClick={onClose}
            className="shrink-0 cursor-pointer rounded-full p-1 text-gray-500 transition-colors hover:bg-gray-100 hover:text-gray-900"
            aria-label="Close modal"
          >
            <CloseIcon />
          </button>
        </div>

        {/* Scrollable variants list */}
        <div className="max-h-[calc(85vh-120px)] overflow-y-auto px-4 pt-2.5 pb-4 sm:px-6 sm:pb-6">
          <div className="space-y-3">
            {products.map((product) => (
              <VariantItem
                key={product.id}
                product={product}
                mainProductId={mainProductId}
                onAdd={() => handleAddClick(product)}
                onRemove={() => handleRemoveClick(product.id)}
                onPlus={() => handlePlusClick(product)}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
