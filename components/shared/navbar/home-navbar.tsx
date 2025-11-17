'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { usePathname } from 'next/navigation';

const HomeNavbar = () => {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const homeNavbarMenuLinks = [
    { href: '/home', label: 'Home' },
    { href: '/about-us', label: 'About Us' },
    { href: '/store-type', label: 'Store Types' },
    { href: '/product-service', label: 'Products & Services' },
    { href: '/partner-bhartiyam', label: 'Partners With Us' },
    { href: '/contact-us', label: 'Contact' },
  ];

  return (
    <header className="absolute top-0 z-50 w-full pr-5 pl-5">
      <div className="mx-auto flex max-w-[1539px] items-center justify-between px-0 py-4 pt-4 sm:px-0 md:px-0 md:py-4 lg:px-6 xl:px-12">
        <Link href="/home" className="flex items-center gap-2">
          <Image
            width={1000}
            height={1000}
            src="/images/logo.webp"
            alt="Bhartiyam Mart logo"
            className="h-auto w-30 object-cover md:w-30 lg:w-40 xl:w-60"
          />
        </Link>

        {/* Mobile toggle button */}
        <button
          aria-label="Toggle navigation"
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
          className="inline-flex items-center justify-center rounded-md border border-gray-300 px-3 py-2 text-gray-700 hover:bg-gray-50 md:hidden"
        >
          <span className="sr-only">Open menu</span>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path d="M4 6h16M4 12h16M4 18h16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          </svg>
        </button>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-3 md:flex md:gap-4 lg:gap-6 xl:gap-12">
          {homeNavbarMenuLinks.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className={`md:text-md text-sm font-medium lg:text-lg ${
                pathname === item.href ? 'text-orange-600' : 'text-black hover:text-orange-600'
              }`}
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="border-t border-gray-200 bg-white md:hidden">
          <nav className="mx-auto max-w-6xl px-4 py-2">
            <ul className="flex flex-col">
              {homeNavbarMenuLinks.map((item) => (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    className={`block rounded-md px-2 py-2 text-sm font-medium ${
                      pathname === item.href ? 'text-orange-600' : 'text-gray-700 hover:bg-gray-50'
                    }`}
                    onClick={() => setOpen(false)}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      )}
    </header>
  );
};

export default HomeNavbar;
