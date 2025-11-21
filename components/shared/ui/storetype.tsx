import Image from 'next/image';
import HomeContact from '@/components/home/home-contact';

import { storeTypes } from '@/data/shared/landing-store';

const StoreType = () => {
  return (
    <>
      <section className="bg-gray-100">
        <div className="mx-auto max-w-7xl px-5 pt-10 pb-10 sm:px-10 xl:px-8">
          <h1 className="text-2xl font-semibold text-balance text-black sm:text-2xl md:text-3xl">Store Types</h1>
        </div>
      </section>

      <section className="bg-gray-10 w-full px-4 sm:px-6 md:px-12 lg:px-20">
        <div className="mx-auto max-w-7xl px-5 py-12 sm:px-0 md:py-16">
          <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-2">
            {storeTypes.map((card) => (
              <article key={card.title} className="relative overflow-hidden rounded border">
                <Image
                  height={1000}
                  width={1000}
                  src={card.img || '/placeholder.svg'}
                  alt={card.title}
                  className="h-96 w-full object-cover md:h-96"
                />

                <div className="rounded-t-lg bg-white p-4">
                  <h2 className="text-2xl font-semibold text-gray-900">{card.title}</h2>
                  <p className="text-md mt-1 leading-relaxed text-gray-600">{card.para}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
      <HomeContact />
    </>
  );
};

export default StoreType;
