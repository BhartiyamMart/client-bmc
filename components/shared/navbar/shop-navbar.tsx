import { forwardRef } from 'react';
import Logo from '@/components/shared/logo';
import Section from '@/components/shared/section';
import NavSearch from '@/components/shared/navbar/nav-search';
import NavProfile from './nav-profile';
import NavWallet from './nav-wallet';
import NavCart from './nav-cart';
import NavLocation from './nav-location';

const ShopNavbar = forwardRef<HTMLElement>((props, ref) => {
  return (
    <Section ref={ref} className="bg-primary-light sticky top-0 z-30">
      {/* Desktop */}
      <div className="hidden w-full items-center justify-between gap-6 lg:flex">
        <div className="flex w-full items-center gap-6">
          <Logo href="/" />
          <NavSearch />
          <NavLocation />
        </div>
        <div className="flex gap-4">
          <NavWallet />
          <NavCart />
          <NavProfile />
        </div>
      </div>
      {/* Tablet and Mobile */}
      <div className="flex w-full flex-col gap-2 lg:hidden">
        <div className="flex items-center justify-between gap-2">
          <NavLocation />
          <div className="flex items-center gap-1 sm:gap-3">
            <NavWallet />
            <NavCart />
            <NavProfile />
          </div>
        </div>
        <NavSearch isMobile />
      </div>
    </Section>
  );
});

ShopNavbar.displayName = 'ShopNavbar';

export default ShopNavbar;
