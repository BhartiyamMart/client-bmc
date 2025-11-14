import SearchPage from '@/components/pages/search/search-page';
import { Metadata } from 'next';
import { Suspense } from 'react';

export const metadata: Metadata = {
  title: 'Search',
  description: 'Search the various products on the Bhartiyam',
};

const page = () => {
  return (
    <Suspense fallback={null}>
      <SearchPage />
    </Suspense>
  );
};

export default page;
