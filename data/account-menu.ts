import { IMenuItem } from '@/interfaces/shared.interface';
import { HandBag, Logout, ProfileIcon } from '@/components/shared/svg/svg-icon';

export const accountMenuItems: IMenuItem[] = [
  {
    name: 'Profile',
    href: '/account/profile',
    icon: ProfileIcon,
    activePatterns: ['/account/profile'],
    exactMatch: true,
  },
  {
    name: 'Orders',
    href: '/account/orders',
    icon: HandBag,
    activePatterns: ['/account/orders', '/orders'],
  },
  {
    name: 'Referrals',
    href: '/account/referrals',
    icon: HandBag,
    activePatterns: ['/account/referral', '/orders'],
    exactMatch: true,
  },
  {
    name: 'Logout',
    href: '#',
    icon: Logout,
    exactMatch: true,
  },
];
