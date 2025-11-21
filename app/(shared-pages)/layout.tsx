'use client';

import { usePathname } from 'next/navigation';
import { useRef, useEffect, useState } from 'react';

import Footer from '@/components/shared/footer/footer';
import SharedNavbar from '@/components/shared/navbar/shared-navbar';

interface RoutesLayoutProps {
  children: React.ReactNode;
}

const SharedPageLayout: React.FC<RoutesLayoutProps> = ({ children }) => {
  const pathname = usePathname();
  const navbarRef = useRef<HTMLElement>(null);
  const [navbarHeight, setNavbarHeight] = useState(0);

  // Define routes where navbar should overlay content (no padding)
  const overlayRoutes = ['/home'];
  const shouldOverlay = overlayRoutes.includes(pathname);

  useEffect(() => {
    if (navbarRef.current) {
      setNavbarHeight(navbarRef.current.offsetHeight);
    }

    const handleResize = () => {
      if (navbarRef.current) {
        setNavbarHeight(navbarRef.current.offsetHeight);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <main>
      <SharedNavbar ref={navbarRef} shouldOverlay={shouldOverlay} />
      {!shouldOverlay && <div style={{ paddingTop: `${navbarHeight}px` }} />}
      {children}
      <Footer />
    </main>
  );
};

export default SharedPageLayout;
