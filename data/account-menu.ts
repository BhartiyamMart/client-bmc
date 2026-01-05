import { IMenuItem } from '@/interfaces/shared.interface';
import { HandBag, Logout, ProfileIcon } from '@/components/shared/svg/svg-icon';

export const accountMenuItems: IMenuItem[] = [
  {
    name: 'Orders',
    href: '/account/orders',
    icon: HandBag,
    activePatterns: ['/account/orders', '/orders'],
  },
  {
    name: 'Profile',
    href: '/account/profile',
    icon: ProfileIcon,
    activePatterns: ['/account/profile'],
    exactMatch: true,
  },
  {
    name: 'Logout',
    href: '#',
    icon: Logout,
    exactMatch: true,
  },
];
