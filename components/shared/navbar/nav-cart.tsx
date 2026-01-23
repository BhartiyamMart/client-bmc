'use client';

import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import Icon from '@/components/shared/ui/icon';
import { CartIcon } from '@/components/shared/svg/svg-icon';
import { useCartItemCount } from '@/stores/useCart.store';
import { useState } from 'react';
import Cart from '../cart/cart';

const NavCart = () => {
  const [isOpen, setIsOpen] = useState(false);
  const itemCount = useCartItemCount();

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <div className="relative hidden cursor-pointer md:flex">
          <Icon icon={CartIcon} />
          {itemCount > 0 && (
            <span className="absolute -top-2 -right-2 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-xs font-semibold text-white">
              {itemCount}
            </span>
          )}
        </div>
      </SheetTrigger>

      <SheetContent className="bg-primary-light flex w-full flex-col overflow-hidden border-none px-4 md:max-w-md">
        <Cart onClose={()=>setIsOpen(false)} />
      </SheetContent>
    </Sheet>
  );
};

export default NavCart;
