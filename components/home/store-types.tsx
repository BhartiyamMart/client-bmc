import Image from 'next/image';

import { storeTypes } from '@/data/shared/landing-store';
import Link from 'next/link';
import Container from '@/components/shared/ui/container';

const StoreTypes = () => {
  return (
    <section className="bg-gray-100 pt-5 pb-10">
      <Container className="mx-auto px-5 py-6 sm:px-6 md:py-6 lg:px-8">
        <header className="mb-8">
          <h2 className="text-2xl font-semibold text-black md:text-3xl">Store Types</h2>
        </header>

        <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3">
          {storeTypes.map((card) => (
            <article key={card.title} className="relative overflow-hidden rounded shadow">
              {/* Background Image */}
              <Image
                src={card.img || '/placeholder.svg'}
                alt={card.title}
                width={1000}
                height={800}
                className="h-80 w-full object-cover md:h-80"
              />

              {/* Overlay Text Card */}
              <div className="absolute right-0 bottom-0 left-0 rounded-t bg-white p-4 shadow-md">
                <h3 className="text-lg font-bold text-gray-900">{card.title}</h3>
                <p className="mt-1 truncate text-sm leading-relaxed text-gray-600">{card.para}</p>
                <p className="pt-5">
                  <Link
                    href="/store-type"
                    className="bg-primary hover:bg-primary/90 focus:ring-none rounded px-5 py-2 text-sm font-medium text-white focus:ring-offset-2 focus:outline-none md:text-base"
                  >
                    View more
                  </Link>
                </p>
              </div>
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
};

export default StoreTypes;
