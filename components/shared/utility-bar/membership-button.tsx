'use client';

import Link from 'next/link';
import Image from 'next/image';

const MembershipButton = () => {
  return (
    <div className="flex items-center gap-2.5">
      <div className="h-5 w-px bg-gray-300" aria-hidden="true" />

      <div className="rounded-full bg-linear-to-r from-[#F9DD75] via-[#C49F12] to-[#F9DD75] p-px">
        <Link
          href="/account/membership"
          className="flex h-9 items-center gap-2 rounded-full bg-[#FFF4C9] px-3 text-sm font-semibold text-[#9E7F04] transition-colors hover:bg-[#FFF0B3]"
        >
          <div className="relative h-4 w-4">
            <Image src="/temp/e.png" alt="" fill className="object-contain select-none" sizes="16px" />
          </div>
          <span className="whitespace-nowrap">Join Membership</span>
        </Link>
      </div>
    </div>
  );
};

export default MembershipButton;
