'use client';

import { motion } from 'framer-motion';
import ShopNavbar from '@/components/shared/navbar/shop-navbar';
import Link from 'next/link';
import { ArrowLeft } from '@/components/shared/svg/svg-icon';
import ShopUtility from '@/components/shared/utility-bar/shop-utility';
import { useRef } from 'react';
import Footer from '@/components/shared/footer/footer';

const Notfound = () => {
  const navbarRef = useRef<HTMLElement>(null);
  return (
    <main>
      <ShopNavbar ref={navbarRef} />
      <ShopUtility navbarRef={navbarRef} />
      <div className="flex min-h-[75vh] flex-col items-center justify-center bg-orange-50 px-4 text-center">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.4 }}
          className="flex flex-col items-center"
        >
          <h1 className="mb-4 text-5xl font-extrabold text-orange-500">Oops! Page Not Found</h1>
          <p className="mb-8 max-w-md text-gray-600">
            The page you&apos;re looking for doesn&apos;t exist or might have been moved. Let&apos;s get you back to
            shopping!
          </p>
          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-full bg-orange-500 px-6 py-3 font-semibold text-white transition hover:bg-orange-700"
          >
            <ArrowLeft className="h-5 w-5" /> Go Back Home
          </Link>
        </motion.div>
      </div>
      <Footer />
    </main>
  );
};

export default Notfound;
