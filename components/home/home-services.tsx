import OptimizedImage from '@/components/shared/optimizeImage';
import Container from '@/components/shared/ui/container';

import { homeServices } from '@/data/shared/common';

const HomeServices = () => {
  return (
    <section className="w-full bg-gray-50 px-4 py-12 sm:px-6 sm:py-16 lg:px-8 lg:py-20">
      <Container className="mx-auto">
        {/* Header */}
        <header className="mb-10 text-center">
          <h2 className="text-2xl font-bold text-gray-900 sm:text-3xl lg:text-4xl">Our Services</h2>
          <p className="mx-auto mt-2 max-w-2xl text-base text-gray-600 sm:text-lg">
            In addition to a diverse product range, Bhartiyam provides a seamless shopping experience through:
          </p>
        </header>

        {/* Services Grid */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-2">
          {homeServices.map((s) => (
            <article
              key={s.title}
              className="flex cursor-pointer items-start gap-4 rounded border-2 bg-white p-5 transition hover:shadow"
            >
              <OptimizedImage
                src={s.icon || '/placeholder.svg'}
                height={100000}
                width={100000}
                alt={s.iconAlt}
                className="w-14 shrink-0 sm:w-16"
                priority
              />

              <div>
                <h3 className="text-lg font-semibold text-gray-900 sm:text-xl">{s.title}</h3>
                <p className="mt-1 text-sm text-gray-600 sm:text-base">{s.description}</p>
              </div>
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
};

export default HomeServices;
