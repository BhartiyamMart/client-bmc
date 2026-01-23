'use client';

import React, { useState } from 'react';
import { ShoppingCart } from '../svg/lucide-icon';
import { useCartItemCount, useCartStore, useCartTotal } from '@/stores/useCart.store';
import Image from 'next/image';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import Cart from '../cart/cart';

export default function MobileCart() {
  const [isOpen, setIsOpen] = useState(false);
  const cart = useCartStore();
  const total = useCartTotal();
  const count = useCartItemCount();

  if (cart.items.length === 0) return null;

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <div className="fixed right-4 bottom-24 left-4 z-30 mx-auto w-fit md:hidden">
        <SheetTrigger asChild>
          <button className="bg-primary flex w-full items-center justify-between rounded-full px-4 py-3 text-white shadow-lg transition-all duration-300 hover:shadow-xl active:scale-95">
            <div className="flex items-center gap-3">
              <div className="relative h-10 w-10 rounded-full bg-white px-1 py-1">
                <Image
                  src={cart.items[0].image}
                  height={1080}
                  width={1080}
                  alt="cart item"
                  className="h-full w-full rounded-full object-cover"
                />
              </div>
              <div className="flex flex-col items-start justify-start font-bold">
                <span>View Cart</span>
                <span className="text-xs sm:text-base">
                  {count} {count === 1 ? 'item' : 'items'}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </div>
          </button>
        </SheetTrigger>
      </div>

      <SheetContent className="bg-primary-light flex w-full flex-col overflow-hidden border-none px-4 lg:max-w-md">
        <Cart />
      </SheetContent>
    </Sheet>
  );
}
