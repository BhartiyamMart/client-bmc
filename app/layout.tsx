import '@/stylesheets/cstyle.css';
import '@/stylesheets/globals.css';

import Script from 'next/script';
import NextTopLoader from 'nextjs-toploader';

import type { Metadata } from 'next';

import { Toaster } from 'react-hot-toast';
import { Work_Sans } from 'next/font/google';

import ActiveModal from '@/components/modals/active-modal';
import { ScrollToTop } from '@/components/shared/ui/scroll-to-top';
import { Providers } from './providers';

const globalFont = Work_Sans({
  subsets: ['latin'],
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
});

export const metadata: Metadata = {
  title: {
    default: 'Bhartiyam Mart',
    template: '%s - Bhartiyam Mart',
  },
  description: '',
  icons: {
    icon: [{ url: '/images/favicon.webp', type: 'image/webp' }],
  },
  verification: {
    google: 'lfKxvnSe09qp53D-92MHriAcxZG4UV-aoi6A3p5uCIo',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${globalFont.className} antialiased`} suppressHydrationWarning>
        {/* GTM noscript must be immediately after the opening <body> */}
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-KH79TFH6"
            height="0"
            width="0"
            style={{ display: 'none', visibility: 'hidden' }}
          />
        </noscript>
        {/* GTM script via next/script */}
        <Script id="gtm-init" strategy="afterInteractive">
          {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
          new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
          j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
          'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
          })(window,document,'script','dataLayer','GTM-KH79TFH6');`}
        </Script>
        <NextTopLoader color="#98FF98" height={2} showSpinner={false} />
        <Toaster position="top-right" reverseOrder={false} />
        <ActiveModal />
        <Providers>{children}</Providers>
        <ScrollToTop />
      </body>
    </html>
  );
}
