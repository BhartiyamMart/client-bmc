import Image from 'next/image';
const StoreTypes = () => {
  return (
    <section className="bg-gray-100 pt-5 pb-10">
      <div className="mx-auto max-w-[1539px] px-5 py-6 sm:px-4 md:px-10 md:py-6 lg:px-20">
        <header className="mb-8">
          <h2 className="text-2xl font-semibold text-black md:text-3xl">Store Types</h2>
        </header>

        <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3">
          {[
            {
              title: 'Bhartiyam Express',
              img: '/images/store-types/mall_01.webp',
              desc: 'At Bhartiyam Express, we blend tradition with technology to bring authentic Indian groceries to.. ',
            },
            {
              title: 'Bhartiyam Super Mall',
              img: '/images/store-types/mall_03.webp',
              desc: 'Bhartiyam - Aapka Daily Needs Partner, is revolutionizing the trends in shopping..',
            },
            {
              title: 'Bhartiyam Daily',
              img: '/images/store-types/mall_02.webp',
              desc: 'At Bhartiyam Daily, our team understands the requirements of our customers and works..',
            },
            {
              title: 'Bhartiyam Mart',
              img: '/images/store-types/mall_04.webp',
              desc: 'Bhartiyam Mart’s smart inventory system combines temperature-controlled storage and..',
            },
            {
              title: 'Bhartiyam Digital',
              img: '/images/store-types/mall_05.webp',
              desc: 'A vibrant shopping hub for trendy gadgets and gizmos. Showcasing renowned brands..',
            },
          ].map((card) => (
            <article key={card.title} className="relative overflow-hidden rounded-lg shadow-md">
              {/* Background Image */}
              <Image
                src={card.img || '/placeholder.svg'}
                alt={card.title}
                width={1000}
                height={800}
                className="h-80 w-full object-cover md:h-80"
              />

              {/* Overlay Text Card */}
              <div className="absolute right-0 bottom-0 left-0 rounded-t-lg bg-white p-4 shadow-md">
                <h3 className="text-lg font-bold text-gray-900">{card.title}</h3>
                <p className="mt-1 text-sm leading-relaxed text-gray-600">{card.desc}</p>
                <p className="pt-5">
                  <a
                    href="/store-type"
                    className="rounded-md bg-orange-600 px-5 py-2 text-sm font-medium text-white hover:bg-orange-700 focus:ring-2 focus:ring-orange-600 focus:ring-offset-2 focus:outline-none md:text-base"
                  >
                    View more
                  </a>
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StoreTypes;
