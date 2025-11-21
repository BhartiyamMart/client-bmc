'use client';

import { useRef, useEffect, useState } from 'react';
import { TriangleDown } from '@/components/shared/svg/svg-icon';
import { useLocationCheck } from '@/hooks/useLocationCheck';
import { useLocationStore } from '@/stores/useLocation.store';

const NavLocation = () => {
  const titleRef = useRef<HTMLParagraphElement>(null);
  const [titleWidth, setTitleWidth] = useState<number>(0);
  const { location, setShowLocationModal } = useLocationStore();

  // Check location on mount
  useLocationCheck();

  // Measure title width for address alignment
  useEffect(() => {
    if (!titleRef.current) return;

    const updateWidth = () => {
      if (titleRef.current) {
        setTitleWidth(titleRef.current.offsetWidth);
      }
    };

    const resizeObserver = new ResizeObserver(updateWidth);
    updateWidth();
    resizeObserver.observe(titleRef.current);

    return () => resizeObserver.disconnect();
  }, []);

  const displayAddress = location?.display_address || 'Select location';

  return (
    <div
      className="max-w-[320px] min-w-0 flex-1 cursor-pointer text-left leading-tight"
      onClick={() => setShowLocationModal(true)}
    >
      <p ref={titleRef} className="w-fit truncate text-xl font-semibold text-gray-900">
        Delivery in 15 minutes
      </p>

      <p className="relative flex items-end gap-2" style={{ width: titleWidth ? `${titleWidth + 30}px` : 'auto' }}>
        <span className="block truncate text-sm text-gray-600">{displayAddress}</span>
        <TriangleDown className="w-[25px]" />
      </p>
    </div>
  );
};

export default NavLocation;
