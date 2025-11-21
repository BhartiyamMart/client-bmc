import Link from 'next/link';
import { SearchIcon } from '@/components/shared/svg/svg-icon';
import { ISearchProps } from '@/interfaces/shared.interface';

const NavSearch: React.FC<ISearchProps> = ({ isMobile = false }) => {
  const baseClasses = 'relative flex flex-1';
  const mobileClasses = isMobile ? 'w-full lg:hidden' : 'hidden lg:flex lg:w-full';
  const inputClasses = isMobile ? 'py-2 pr-4 pl-10 text-lg' : 'py-2.5 pr-4 pl-10 text-xl';

  return (
    <Link href="/search" className={`${baseClasses} ${mobileClasses}`}>
      <input
        type="text"
        placeholder="Search Product"
        readOnly
        className={`placeholder-text-secondary h-12 w-full cursor-text rounded-lg bg-white transition-all outline-none ${inputClasses}`}
      />
      <div className="absolute inset-y-0 left-2 flex items-center px-1">
        <SearchIcon />
      </div>
    </Link>
  );
};

export default NavSearch;
