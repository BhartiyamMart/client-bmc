'use client';

import Link from 'next/link';
import Footer from '@/components/shared/footer/footer';
import ShopNavbar from '@/components/shared/navbar/shop-navbar';
import ShopUtility from '@/components/shared/ui/utility-bar/shop-utility';

import { useRef } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from '@/components/shared/svg/svg-icon';

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
          <h1 className="text-primary mb-4 text-5xl font-extrabold">Oops! Page Not Found</h1>
          <p className="mb-8 max-w-md text-gray-600">
            The page you&apos;re looking for doesn&apos;t exist or might have been moved. Let&apos;s get you back to
            shopping!
          </p>
          <Link
            href="/"
            className="bg-primary hover:bg-primary/90 inline-flex items-center gap-2 rounded-full px-6 py-3 font-semibold text-white transition"
          >
            <ArrowRight className="h-5 w-5" /> Go Back Home
          </Link>
        </motion.div>
      </div>
      <Footer />
    </main>
  );
};

export default Notfound;
