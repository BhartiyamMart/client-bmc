'use client';

import { useEffect, useState } from 'react';

export function ScrollToTop() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    function onScroll() {
      setShow(window.scrollY > 100);
    }
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  function handleClick() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      aria-label="Scroll to top"
      className={`fixed right-6 bottom-6 inline-flex h-12 w-12 cursor-pointer items-center justify-center rounded-full bg-orange-600 text-white shadow-lg transition-opacity hover:bg-orange-700 focus:ring-2 focus:ring-orange-600 focus:ring-offset-2 focus:outline-none ${
        show ? 'opacity-100' : 'pointer-events-none opacity-0'
      }`}
    >
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d="M12 19V5m0 0l-6 6m6-6l6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      </svg>
    </button>
  );
}
