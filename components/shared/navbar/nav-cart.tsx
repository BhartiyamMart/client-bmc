'use client';

import Icon from '@/components/shared/ui/icon';
import { CartIcon } from '@/components/shared/svg/svg-icon';

const NavCart = () => {
  return (
    <div className="hidden md:flex">
      <Icon icon={CartIcon} />
    </div>
  );
};

export default NavCart;
