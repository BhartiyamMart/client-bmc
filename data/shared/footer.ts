import { INavLinkData, ISocialLinkData } from '@/interfaces/shared.interface';

export const socialLinks: ISocialLinkData[] = [
  {
    href: 'https://www.instagram.com/teambhartiyam',
    label: 'Instagram',
    svg: '<svg viewBox="0 0 24 24" fill="currentColor" class="h-5 w-5"><path d="M12 2c2.717 0 3.056.01 4.122.06 1.065.05 1.79.217 2.428.465.66.254 1.216.598 1.772 1.153.509.5.902 1.105 1.153 1.772.247.637.415 1.363.465 2.428.047 1.066.06 1.405.06 4.122 0 2.717-.01 3.056-.06 4.122-.05 1.065-.218 1.79-.465 2.428a4.883 4.883 0 01-1.153 1.772c-.5.508-1.105.902-1.772 1.153-.637.247-1.363.415-2.428.465-1.066.047-1.405.06-4.122.06-2.717 0-3.056-.01-4.122-.06-1.065-.05-1.79-.218-2.428-.465a4.89 4.89 0 01-1.772-1.153 4.904 4.904 0 01-1.153-1.772c-.248-.637-.415-1.363-.465-2.428C2.013 15.056 2 14.717 2 12c0-2.717.01-3.056.06-4.122.05-1.066.217-1.79.465-2.428a4.88 4.88 0 011.153-1.772A4.897 4.897 0 015.45 2.525c.638-.248 1.362-.415 2.428-.465C8.944 2.013 9.283 2 12 2zm0 5a5 5 0 100 10 5 5 0 000-10zm6.5-.25a1.25 1.25 0 10-2.5 0 1.25 1.25 0 002.5 0zM12 9a3 3 0 110 6 3 3 0 010-6z" /></svg>',
  },
  {
    href: 'https://x.com/TeamBhartiyam',
    label: 'Twitter',
    svg: '<svg viewBox="0 0 24 24" fill="currentColor" class="h-5 w-5"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" /></svg>',
  },
  {
    href: 'https://www.facebook.com/TeamBhartiyam',
    label: 'Facebook',
    svg: '<svg viewBox="0 0 24 24" fill="currentColor" class="h-5 w-5"><path d="M9.198 21.5h4v-8.01h3.604l.396-3.98h-4V7.5a1 1 0 011-1h3v-4h-3a5 5 0 00-5 5v2.01h-2l-.396 3.98h2.396v8.01z" /></svg>',
  },
  {
    href: 'https://www.linkedin.com/company/bhartiyamstore/posts/?feedView=all',
    label: 'LinkedIn',
    svg: '<svg viewBox="0 0 24 24" fill="currentColor" class="h-5 w-5"><path d="M6.94 5a2 2 0 11-4-.002 2 2 0 014 .002zM7 8.48H3V21h4V8.48zm6.32 0H9.34V21h3.94v-6.57c0-3.66 4.77-4 4.77 0V21H22v-7.93c0-6.17-7.06-5.94-8.72-2.91l.04-1.68z" /></svg>',
  },
  {
    href: 'https://www.youtube.com/@TeamBhartiyam',
    label: 'YouTube',
    svg: '<svg viewBox="0 0 24 24" fill="currentColor" class="h-5 w-5"><path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" /></svg>',
  },
];

export const companyLinks: INavLinkData[] = [
  { href: '/home', label: 'Home' },
  { href: '/about-us', label: 'About us' },
  { href: '/store-type', label: 'Store Type' },
  { href: '/product-service', label: 'Product Service' },
  { href: '/partner-bhartiyam', label: 'Partner with Bhartiyam' },
  { href: '/contact-us', label: 'Contact Us' },
];

export const legalLinks: INavLinkData[] = [
  { href: '/privacy-policy', label: 'Privacy Policy' },
  { href: '/terms-of-use', label: 'Terms of Use' },
  { href: '/return-policy', label: 'Return Policy' },
  { href: '/refund-policy', label: 'Refund Policy' },
  { href: '/account-delete', label: 'Account Delete Policy' },
];
