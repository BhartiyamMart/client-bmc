'use client';

import Link from 'next/link';
import Logo from '@/components/shared/logo';
import Section from '@/components/shared/section';

import { usePathname } from 'next/navigation';
import { useState, useEffect, forwardRef } from 'react';

interface SharedNavbarProps {
  shouldOverlay?: boolean;
}

const SharedNavbar = forwardRef<HTMLElement, SharedNavbarProps>(({ shouldOverlay = false }, ref) => {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const homeNavbarMenuLinks = [
    { href: '/home', label: 'Home' },
    { href: '/about-us', label: 'About Us' },
    { href: '/store-type', label: 'Store Types' },
    { href: '/product-service', label: 'Products & Services' },
    { href: '/partner-bhartiyam', label: 'Partners With Us' },
    { href: '/contact-us', label: 'Contact' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [scrolled]);

  return (
    <Section
      ref={ref}
      className={`fixed top-0 right-0 left-0 z-40 w-full transition-all duration-300 ${
        scrolled || !shouldOverlay ? 'bg-primary-light' : 'bg-transparent'
      }`}
    >
      <div className="flex w-full items-center justify-between gap-6">
        <Logo href={'/home'} />

        {/* Mobile toggle button */}
        <button
          aria-label="Toggle navigation"
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
          className={`inline-flex items-center justify-center transition-colors lg:hidden`}
        >
          <span className="sr-only">Open menu</span>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path d="M4 6h16M4 12h16M4 18h16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          </svg>
        </button>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-7 lg:flex">
          {homeNavbarMenuLinks.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className={`font-medium transition-colors ${
                pathname === item.href
                  ? 'text-orange-600'
                  : scrolled || !shouldOverlay
                    ? 'text-gray-900 hover:text-orange-600'
                    : 'text-black hover:text-orange-400'
              }`}
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </div>

      {/* Mobile menu - FIXED BELOW HEADER */}
      {open && (
        <div className="fixed top-16 right-0 left-0 z-30 border-t border-gray-200 bg-white shadow-lg lg:hidden">
          <nav className="mx-auto max-w-6xl px-4 py-3">
            <ul className="flex flex-col gap-1">
              {homeNavbarMenuLinks.map((item) => (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    className={`block rounded-md px-3 py-2 text-base font-medium transition-colors ${
                      pathname === item.href ? 'bg-orange-50 text-orange-600' : 'text-gray-700 hover:bg-gray-100'
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
    </Section>
  );
});

SharedNavbar.displayName = 'SharedNavbar';

export default SharedNavbar;
