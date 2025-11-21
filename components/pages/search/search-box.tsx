'use client';

import { useRouter } from 'nextjs-toploader/app';
import { useSearchParams } from 'next/navigation';
import { useRef, useEffect, useState } from 'react';
import { ISearchProps } from '@/interfaces/shared.interface';
import { ArrowLeft, CloseIcon, SearchIcon } from '@/components/shared/svg/svg-icon';

const SearchBox: React.FC<ISearchProps> = ({ isMobile = false }) => {
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();
  const searchParams = useSearchParams();

  // Auto-focus input when component mounts
  useEffect(() => {
    const timer = setTimeout(() => {
      inputRef.current?.focus();
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  // Initialize query from URL params
  useEffect(() => {
    const urlQuery = searchParams.get('q') || '';
    setQuery(urlQuery);
  }, [searchParams]);

  // Update URL with search query (debounced)
  useEffect(() => {
    const handler = setTimeout(() => {
      const trimmedQuery = query.trim();
      const currentQuery = searchParams.get('q') || '';

      // Only update if query has changed
      if (trimmedQuery !== currentQuery) {
        if (trimmedQuery) {
          router.replace(`/search?q=${encodeURIComponent(trimmedQuery)}`);
        } else {
          router.replace('/search');
        }
      }
    }, 300);

    return () => clearTimeout(handler);
  }, [query, router, searchParams]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    inputRef.current?.blur();
  };

  const handleClear = () => {
    setQuery('');
    router.replace('/search');
    inputRef.current?.focus();
  };

  const handleBack = () => {
    if (typeof window !== 'undefined') {
      const redirectUrl = localStorage.getItem('headerSearchRedirect');
      if (redirectUrl) {
        router.push(redirectUrl);
        localStorage.removeItem('headerSearchRedirect');
      } else {
        router.push('/');
      }
    }
  };

  const baseClasses = 'relative flex flex-1';
  const mobileClasses = isMobile ? 'w-full lg:hidden' : 'hidden lg:flex lg:w-full';
  const inputClasses = isMobile ? 'py-2 pr-4 pl-10 text-lg' : 'py-2.5 pr-4 pl-10 text-xl';

  return (
    <form onSubmit={handleSubmit} className={`${baseClasses} ${mobileClasses}`}>
      <div className="relative w-full">
        <input
          ref={inputRef}
          type="text"
          placeholder="Search Product"
          value={query}
          onChange={handleChange}
          className={`placeholder-text-secondary h-12 w-full cursor-text rounded-lg bg-white transition-all outline-none ${inputClasses}`}
        />

        {/* Search Icon (Desktop) / Back Arrow (Mobile) */}
        <div className="absolute inset-y-0 left-2 flex items-center px-1">
          {isMobile ? (
            <button
              type="button"
              onClick={handleBack}
              className="flex items-center transition-colors hover:opacity-70"
              aria-label="Go back"
            >
              <ArrowLeft className="h-5 w-5 text-gray-600" />
            </button>
          ) : (
            <SearchIcon />
          )}
        </div>

        {/* Clear Button - only show when there's text */}
        {query && (
          <button
            type="button"
            onClick={handleClear}
            className="absolute top-1/2 right-3 flex -translate-y-1/2 cursor-pointer items-center rounded-full p-1 transition hover:bg-gray-100"
            aria-label="Clear search"
          >
            <CloseIcon className="h-5 w-5 text-gray-600" />
          </button>
        )}
      </div>
    </form>
  );
};

export default SearchBox;
