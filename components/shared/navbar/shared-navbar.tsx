'use client';

import Link from 'next/link';
import Logo from '@/components/shared/ui/logo';
import Section from '@/components/shared/ui/section';

import { usePathname } from 'next/navigation';
import { useState, useEffect, forwardRef } from 'react';
import { SharedNavbarMenu } from '@/data/shared/navbar';

interface SharedNavbarProps {
  shouldOverlay?: boolean;
}

const SharedNavbar = forwardRef<HTMLElement, SharedNavbarProps>(({ shouldOverlay = false }, ref) => {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [navbarHeight, setNavbarHeight] = useState(0);

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

  // Measure navbar height for mobile menu positioning
  useEffect(() => {
    if (ref && typeof ref !== 'function' && ref.current) {
      setNavbarHeight(ref.current.offsetHeight);
    }
  }, [ref, open]);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  return (
    <>
      <Section
        ref={ref}
        className={`fixed top-0 right-0 left-0 z-40 w-full transition-all duration-300 ${
          scrolled || !shouldOverlay || open ? 'bg-primary-light' : 'bg-transparent'
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
            <span className="sr-only">{open ? 'Close menu' : 'Open menu'}</span>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              {open ? (
                <path d="M6 18L18 6M6 6l12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              ) : (
                <path d="M4 6h16M4 12h16M4 18h16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              )}
            </svg>
          </button>

          {/* Desktop nav */}
          <nav className="hidden items-center gap-7 lg:flex">
            {SharedNavbarMenu.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className={`font-medium transition-colors ${
                  pathname === item.href
                    ? 'text-primary'
                    : scrolled || !shouldOverlay
                      ? 'hover:text-primary text-black'
                      : 'hover:text-primary text-black'
                }`}
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
      </Section>

      {/* Mobile menu - positioned below navbar using dynamic height */}
      {open && (
        <div
          className="fixed right-0 left-0 z-30 border-t bg-white shadow-lg lg:hidden"
          style={{ top: `${navbarHeight}px` }}
        >
          <nav className="mx-auto max-w-6xl px-4 py-3">
            <ul className="flex flex-col gap-1">
              {SharedNavbarMenu.map((item) => (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    className={`block rounded-md px-3 py-2 text-base font-medium transition-colors ${
                      pathname === item.href
                        ? 'bg-primary/10 text-primary'
                        : 'hover:bg-primary/10 hover:text-primary text-black'
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

      {/* Backdrop overlay */}
      {open && (
        <div
          className="fixed inset-0 z-20 bg-black/20 lg:hidden"
          style={{ top: `${navbarHeight}px` }}
          onClick={() => setOpen(false)}
          aria-hidden="true"
        />
      )}
    </>
  );
});

SharedNavbar.displayName = 'SharedNavbar';

export default SharedNavbar;
