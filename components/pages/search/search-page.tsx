import Logo from '@/components/shared/logo';
import Section from '@/components/shared/section';
import SearchBox from '@/components/pages/search/search-box';
import NavCart from '@/components/shared/navbar/nav-cart';

const SearchPage = () => {
  return (
    <Section className="bg-primary-light">
      {/* Desktop */}
      <div className="hidden w-full items-center justify-between gap-4 lg:flex">
        <div className="flex w-full items-center gap-6">
          <Logo href="/" />
          <SearchBox />
        </div>
        <div className="flex items-center gap-1 sm:gap-3">
          <NavCart />
        </div>
      </div>
      {/* Tablet and Mobile */}
      <SearchBox isMobile />
    </Section>
  );
};

export default SearchPage;
