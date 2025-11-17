import Image from 'next/image';
import { ContactForm } from './contact/contact-form';
// import { storeTypes } from '@/data/landingstore'; // adjust path as needed
import { Mail, Phone } from './svg-icon';
const StoreType = () => {
  return (
    <>
      <section className="bg-gray-100">
        <div className="mx-auto mt-20 max-w-7xl px-5 pt-10 pb-10 sm:mt-25 sm:px-10 md:mt-25 lg:mt-25 lg:px-10 xl:px-2">
          <h1 className="text-2xl font-semibold text-balance text-black sm:text-2xl md:text-3xl">Store Types</h1>
        </div>
      </section>

      <section className="bg-gray-10 w-full px-4 sm:px-6 md:px-12 lg:px-20">
        <div className="mx-auto max-w-7xl px-5 py-12 sm:px-0 md:py-16">
          {/* <header className="mb-8">
            <h2 className="text-2xl font-semibold text-black md:text-3xl">
              Store Types
            </h2>
          </header> */}

          {/* <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-2">
            {storeTypes.map((card) => (
              <article key={card.title} className="relative overflow-hidden rounded-lg shadow-md">
                <Image
                  height={1000}
                  width={1000}
                  src={card.img || '/placeholder.svg'}
                  alt={card.title}
                  className="h-52 w-full object-cover md:h-52"
                />

                <div className="rounded-t-lg bg-white p-4">
                  <h2 className="text-2xl font-semibold text-gray-900">{card.title}</h2>
                  <p className="text-md mt-1 leading-relaxed text-gray-600">{card.para}</p>
                </div>
              </article>
            ))}
          </div> */}
        </div>
      </section>

      <section
        id="contact"
        className="w-full bg-[url('/img/contact_bg.jpg')] bg-cover bg-fixed bg-center px-5 sm:px-6 lg:px-10"
      >
        <div className="mx-auto mt-10 max-w-7xl pt-10 pb-20">
          <header className="mb-8 text-center"></header>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
            {/* Contact Info */}

            <div className="rounded-lg border border-gray-200 bg-white p-1 lg:p-6">
              <p className="rounded-md bg-white p-2 text-base text-black md:text-lg">
                <span className="text-2xl font-semibold">Address</span>
                <br />
                New Delhi, India
              </p>
              <div className="mt-4 space-y-2 rounded-md bg-white p-2 text-black md:mt-6 md:text-lg">
                <p className="flex">
                  <b className="flex font-semibold">
                    {' '}
                    <Phone className="mr-1.5 w-5" /> Mobile : &nbsp;
                  </b>{' '}
                  +91 8800033044
                </p>
                <p className="flex">
                  <b className="flex font-semibold">
                    <Mail className="mr-1.5 w-5" /> Email : &nbsp;
                  </b>{' '}
                  info@bhartiyam.in{' '}
                </p>
                <p className="pl-24">care@bhartiyam.in</p>
              </div>
            </div>

            {/* Contact Form */}
            <ContactForm email={process.env.NEXT_PUBLIC_SUPPORT_EMAIL ?? ''} />
          </div>
        </div>
      </section>
    </>
  );
};

export default StoreType;
