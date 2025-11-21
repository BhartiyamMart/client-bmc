import Image from 'next/image';
import FaqAboutus from '@/components/faq/service-faq';

import { Card, CardContent } from '@/components/ui/card';
import { Mail, Phone } from '@/components/shared/svg/svg-icon';
import { ContactForm } from '@/components/shared/contact/contact-form';

const ProductService = () => {
  return (
    <>
      <section className="bg-gray-100">
        <div className="mx-auto mt-20 max-w-7xl px-5 pt-10 pb-10 sm:mt-25 sm:px-0 md:mt-25 lg:mt-25">
          <h1 className="text-2xl font-semibold text-balance text-black sm:text-2xl md:text-3xl">
            Products & Services
          </h1>
        </div>
      </section>
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-7xl">
            <p className="text-lg leading-relaxed text-gray-700">
              At <strong>Bhartiyam</strong>, we offer a <strong>diverse portfolio of retail and FMCG products</strong>{' '}
              designed to meet the everyday needs of Indian households and businesses. From{' '}
              <strong>daily groceries to digital lifestyle essentials</strong>, our products combine quality,
              affordability, and reliability, making us your one-stop destination for smarter shopping.
            </p>
          </div>
        </div>
      </section>
      <section className="bg-gray-50 px-5 py-16 sm:px-0">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-8 md:grid-cols-2">
            <Card className="bg-white shadow-sm transition-shadow hover:shadow-md">
              <CardContent className="p-8">
                <h2 className="mb-4 text-2xl font-semibold text-gray-900">1. Daily Essentials & Groceries</h2>
                <p className="mb-4 text-gray-700">
                  From fresh food to packaged goods, Bhartiyam ensures you have access to everything your family needs
                  every day.
                </p>
                <p className="text-gray-700">
                  <strong>Products include:</strong> Rice, pulses, grains, oils, spices, snacks, beverages, packaged
                  foods, and fresh produce.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-white shadow-sm transition-shadow hover:shadow-md">
              <CardContent className="p-8">
                <h2 className="mb-4 text-2xl font-semibold text-gray-900">2. Household & Kitchen Products</h2>
                <p className="mb-4 text-gray-700">
                  We make homes complete with a wide range of household items and kitchen essentials.
                </p>
                <p className="text-gray-700">
                  <strong>Products include:</strong> Cleaning supplies, detergents, kitchenware, storage solutions, home
                  care, and eco-friendly products.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-white shadow-sm transition-shadow hover:shadow-md">
              <CardContent className="p-8">
                <h2 className="mb-4 text-2xl font-semibold text-gray-900">3. Personal Care & Wellness</h2>
                <p className="mb-4 text-gray-700">
                  Bhartiyam believes in promoting health, hygiene, and self-care with premium yet affordable products.
                </p>
                <p className="text-gray-700">
                  <strong>Products include:</strong> Skincare, haircare, bath & hygiene, health supplements, and baby
                  care essentials.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-white shadow-sm transition-shadow hover:shadow-md">
              <CardContent className="p-8">
                <h2 className="mb-4 text-2xl font-semibold text-gray-900">4. Digital & Lifestyle Products</h2>
                <p className="mb-4 text-gray-700">
                  We go beyond essentials by offering digital and lifestyle solutions for modern living.
                </p>
                <p className="text-gray-700">
                  <strong>Products include:</strong> Mobile accessories, consumer electronics, smart home products, and
                  lifestyle gadgets.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
      <section className="bg-gray-100 px-5 py-16 sm:px-0">
        <div className="mx-auto max-w-7xl px-4">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <div className="order-2 lg:order-1">
              <Image
                width={1000}
                height={100}
                src="/images/product-service/img_10.webp"
                alt="Why Shop with Bhartiyam"
                className="h-80 w-full rounded-lg object-cover shadow-lg"
              />
            </div>
            <div className="order-1 lg:order-2">
              <h2 className="mb-4 text-3xl font-semibold text-gray-900">Our Services</h2>
              <p className="mb-6 text-xl text-gray-700">
                In addition to a diverse product range, Bhartiyam provides a seamless shopping experience through
              </p>
              <ul className="mb-8 space-y-4">
                <li className="flex items-start">
                  <span className="mr-2 text-orange-500">•</span>
                  <span>
                    <strong>Online Shopping Platform</strong> – Shop anytime, anywhere
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2 text-orange-500">•</span>
                  <span>
                    <strong>Offline Retail Stores</strong> – Experience our products firsthand
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2 text-orange-500">•</span>
                  <span>
                    <strong>Fast Delivery Services</strong> – Quick and reliable order fulfillment
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2 text-orange-500">•</span>
                  <span>
                    <strong>B2B Support</strong> – Wholesale and business solutions available
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>
      <section className="bg-white px-5 py-16 sm:px-0">
        <div className="mx-auto max-w-7xl">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <div>
              <h2 className="mb-6 text-3xl font-semibold text-gray-900">Why Shop with Bhartiyam?</h2>
              <p className="mb-6 text-lg text-gray-700">
                Whether you need{' '}
                <strong>
                  groceries for your home, wellness products for your family, or digital solutions for modern living
                </strong>
                , Bhartiyam has it all. Start shopping today with Bhartiyam – Where Quality Meets Affordability.
              </p>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <span className="mr-2 text-orange-500">✓</span>
                  <span>High-quality FMCG and retail products</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2 text-orange-500">✓</span>
                  <span>Affordable pricing for every budget</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2 text-orange-500">✓</span>
                  <span>Easy access across online and offline platforms</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2 text-orange-500">✓</span>
                  <span>Trusted by households and businesses nationwide</span>
                </li>
              </ul>
            </div>
            <div>
              <Image
                width={1000}
                height={100}
                src="/images/product-service/bgimg.webp"
                alt="Why Shop with Bhartiyam"
                className="h-80 w-full rounded-lg object-cover shadow-lg"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white px-5 sm:px-0">
        <div className="mx-auto mt-15 max-w-7xl pt-10 pb-10">
          <FaqAboutus />
        </div>
      </section>

      <section className="w-full bg-[url('/images/partner-with-us/contact_bg.webp')] bg-cover bg-fixed bg-center px-5 sm:px-10">
        <div className="mx-auto mt-15 max-w-7xl pt-20 pb-20">
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
                  +91 9266413030
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

export default ProductService;
