import OptimizedImage from '@/components/shared/optimizeImage';
import Container from '@/components/shared/ui/container';

import { storeTypes } from '@/data/shared/landing-store';
import { ContactForm } from '../contact/contact-form';
import { Mail, Phone } from '../svg/svg-icon';

const StoreType = () => {
  return (
    <>
      <section className="bg-gray-100">
        <Container className="mx-auto px-5 pt-10 pb-10 sm:px-10 xl:px-8">
          <h1 className="text-2xl font-semibold text-balance text-black sm:text-2xl md:text-3xl">Store Types</h1>
        </Container>
      </section>

      <section className="bg-gray-10 w-full px-5 sm:px-10 xl:px-8">
        <Container className="mx-auto py-12 sm:px-0 md:py-16">
          <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-2">
            {storeTypes.map((card) => (
              <article key={card.title} className="relative overflow-hidden rounded border">
                <OptimizedImage
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
        </Container>
      </section>
      <section className="w-full bg-[url('/images/contactus/contact_bg.webp')] bg-cover bg-fixed bg-center bg-no-repeat">
        <Container className="m-auto px-4 py-12 sm:px-6 md:py-16 lg:px-8">
          <div className="grid gap-6 lg:grid-cols-2 lg:gap-8">
            {/* Left Column - Contact Info */}
            <div className="space-y-6">
              <div className="rounded bg-white p-6">
                <h2 className="mb-3 text-2xl font-bold text-gray-900">Address</h2>
                <p className="text-base text-gray-700">New Delhi, India</p>
              </div>

              <div className="space-y-3 rounded bg-white p-6">
                <h3 className="mb-4 text-xl font-bold text-gray-900">Get In Touch</h3>

                <div className="flex items-start gap-3">
                  <Phone className="text-primary mt-0.5 w-5 shrink-0" />
                  <div>
                    <p className="text-sm font-semibold text-gray-700">Mobile</p>
                    <a href="tel:+918800033044" className="hover:text-primary/90 text-base text-gray-900">
                      +91 8800033044
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Mail className="text-primary mt-0.5 w-5 shrink-0" />
                  <div>
                    <p className="text-sm font-semibold text-gray-700">Email</p>
                    <div className="space-y-1">
                      <a
                        href="mailto:care@bhartiyam.in"
                        className="hover:text-primary/90 block text-base text-gray-900"
                      >
                        care@bhartiyam.in
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column - Contact Form */}
            <ContactForm email={process.env.NEXT_PUBLIC_CARE_EMAIL ?? 'care@bhartiyam.in'} />
          </div>
        </Container>
      </section>
    </>
  );
};

export default StoreType;
