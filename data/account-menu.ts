import { IMenuItem } from '@/interfaces/shared.interface';
import { HandBag, Logout, MapPin, ProfileIcon } from '@/components/shared/svg/svg-icon';
import { Share } from '@/components/shared/svg/lucide-icon';

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
    name: 'Address',
    href: '/account/address',
    icon: MapPin,
    activePatterns: ['/account/address', '/address'],
  },
  {
    name: 'Referrals',
    href: '/account/referrals',
    icon: Share,
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
