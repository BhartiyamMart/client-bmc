'use client';

import Icon from '@/components/shared/icon';
import { CartIcon } from '@/components/shared/svg-icon';

const NavCart = () => {
  return (
    <div className="hidden md:flex">
      <Icon icon={CartIcon} />
    </div>
  );
};

export default NavCart;
