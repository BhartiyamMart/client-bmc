import OptimizedImage from '@/components/shared/optimizeImage';
import PartnerFaq from '@/components/faq/faq-partner';
import HomeContact from '@/components/home/home-contact';
import Container from '@/components/shared/ui/container';

import { Card, CardContent } from '@/components/ui/card';
import { ContactForm } from '../contact/contact-form';
import { Mail, Phone } from '../svg/svg-icon';

const PartnerBhartiyam = () => {
  return (
    <>
      {/* Header Section */}
      <section className="bg-gray-100">
        <Container className="mx-auto px-5 py-10 sm:px-6 lg:px-8">
          <h1 className="text-2xl font-semibold text-balance text-black sm:text-2xl md:text-3xl">
            Partners With Us – Bhartiyam
          </h1>
        </Container>
      </section>

      {/* About Section */}
      <section className="w-full bg-white py-12 md:py-16">
        <Container className="mx-auto px-5 sm:px-6 lg:px-8">
          <p className="text-base leading-relaxed text-gray-700">
            At <strong>Bhartiyam</strong>, we believe in the power of collaboration. We are a{' '}
            <strong>Fast Moving Consumer Goods (FMCG) brand in India</strong>. We look forward to building strong,
            long-term partnerships with <strong>suppliers, distributors, manufacturers, and business associates</strong>{' '}
            who share our vision for quality, affordability, and customer satisfaction.
          </p>

          <div className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-12">
            <div className="lg:col-span-7">
              <p className="mb-4 text-base font-semibold text-gray-900">By partnering with us, you gain access to:</p>

              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <span className="mt-1 text-black">•</span>
                  <span className="text-base leading-relaxed text-gray-700">
                    A strong and expanding customer base across India.
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-1 text-black">•</span>
                  <span className="text-base leading-relaxed text-gray-700">
                    Omni-channel presence with online and offline retail formats.
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-1 text-black">•</span>
                  <span className="text-base leading-relaxed text-gray-700">
                    Trusted brand reputation under Kamna Mart Private Limited.
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-1 text-black">•</span>
                  <span className="text-base leading-relaxed text-gray-700">
                    Growth opportunities in one of the fastest-growing FMCG sectors.
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-1 text-black">•</span>
                  <span className="text-base leading-relaxed text-gray-700">
                    A partnership built on transparency, innovation, and mutual success.
                  </span>
                </li>
              </ul>
            </div>

            <div className="lg:col-span-5">
              <OptimizedImage
                width={1000}
                height={1000}
                src="/images/partner-with-us/p_img01.webp"
                alt="Partner with Bhartiyam"
                className="h-80 w-full rounded object-cover md:h-96"
              />
            </div>
          </div>
        </Container>
      </section>

      {/* Partnership Types Section */}
      <section className="bg-gray-50 py-12 md:py-16">
        <Container className="mx-auto px-5 sm:px-6 lg:px-8">
          <div className="grid gap-6 sm:grid-cols-2">
            <Card className="overflow-hidden rounded border bg-white hover:shadow">
              <CardContent className="p-6">
                <h2 className="text-2xl font-semibold text-gray-900">1. Suppliers & Manufacturers</h2>
                <p className="text-md mt-2 leading-relaxed text-gray-600">
                  We work closely with Fast Moving Consumer Goods (FMCG) suppliers, manufacturers, and producers to
                  deliver high-quality products to our customers at the most affordable prices.
                </p>
              </CardContent>
            </Card>

            <Card className="overflow-hidden rounded border bg-white hover:shadow">
              <CardContent className="p-6">
                <h2 className="text-2xl font-semibold text-gray-900">2. Distributors & Retail Partners</h2>
                <p className="text-md mt-2 leading-relaxed text-gray-600">
                  Our network of distributors and retail outlets ensures Bhartiyam products are accessible across
                  multiple regions in India. Partner with us to expand your reach.
                </p>
              </CardContent>
            </Card>

            <Card className="overflow-hidden rounded border bg-white hover:shadow">
              <CardContent className="p-6">
                <h2 className="text-2xl font-semibold text-gray-900">3. B2B & Corporate Solutions</h2>
                <p className="text-md mt-2 leading-relaxed text-gray-600">
                  Bhartiyam also provides bulk orders and customized business solutions for corporate clients,
                  wholesalers, and institutions.
                </p>
              </CardContent>
            </Card>

            <Card className="overflow-hidden rounded border bg-white hover:shadow">
              <CardContent className="p-6">
                <h2 className="text-2xl font-semibold text-gray-900">4. Technology & Service Partners</h2>
                <p className="text-md mt-2 leading-relaxed text-gray-600">
                  From logistics to digital innovation, we collaborate with service providers to create a seamless
                  shopping experience for our customers.
                </p>
              </CardContent>
            </Card>
          </div>
        </Container>
      </section>

      {/* How to Partner Section */}
      <section className="bg-gray-100 py-12 md:py-16">
        <Container className="mx-auto px-5 sm:px-6 lg:px-8">
          <div className="grid items-center gap-8 lg:grid-cols-2 lg:gap-12">
            <div className="order-2 lg:order-1">
              <OptimizedImage
                width={1000}
                height={1000}
                src="/images/partner-with-us/img_10.webp"
                alt="How to Partner with Bhartiyam"
                className="h-80 w-full rounded object-cover md:h-96"
              />
            </div>
            <div className="order-1 lg:order-2">
              <h2 className="mb-4 text-2xl font-semibold text-gray-900">How to Partner With Bhartiyam?</h2>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <span className="mt-1 text-black">•</span>
                  <span className="text-base leading-relaxed text-gray-700">
                    Fill the Partnership Inquiry Form (or contact us directly).
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-1 text-black">•</span>
                  <span className="text-base leading-relaxed text-gray-700">
                    Our team will evaluate the opportunity.
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-1 text-black">•</span>
                  <span className="text-base leading-relaxed text-gray-700">
                    We align on terms, vision, and growth strategy.
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-1 text-black">•</span>
                  <span className="text-base leading-relaxed text-gray-700">
                    Start working together to create value-driven success.
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </Container>
      </section>

      {/* FAQ Section */}
      <section className="bg-white py-12 md:py-16">
        <Container className="mx-auto px-5 sm:px-6 lg:px-8">
          <PartnerFaq />
        </Container>
      </section>

      {/* Contact Section */}
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
                      +91 9266413030
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
                        info@bhartiyam.in
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column - Contact Form */}
            <ContactForm email={process.env.NEXT_PUBLIC_INFO_EMAIL ?? 'info@bhartiyam.in'} />
          </div>
        </Container>
      </section>
    </>
  );
};

export default PartnerBhartiyam;
