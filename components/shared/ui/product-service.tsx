import { Card, CardContent } from '@/components/ui/card';

import Image from 'next/image';
import FaqAboutus from '@/components/faq/service-faq';
import HomeContact from '@/components/home/home-contact';

const ProductService = () => {
  return (
    <>
      {/* Header Section */}
      <section className="bg-gray-100">
        <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
          <h1 className="text-2xl font-semibold text-balance text-black sm:text-2xl md:text-3xl">
            Products & Services
          </h1>
        </div>
      </section>

      {/* Introduction Section */}
      <section className="w-full bg-white py-12 md:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <p className="text-base leading-relaxed text-gray-700">
            At <strong>Bhartiyam</strong>, we offer a <strong>diverse portfolio of retail and FMCG products</strong>{' '}
            designed to meet the everyday needs of Indian households and businesses. From{' '}
            <strong>daily groceries to digital lifestyle essentials</strong>, our products combine quality,
            affordability, and reliability, making us your one-stop destination for smarter shopping.
          </p>
        </div>
      </section>

      {/* Products Grid Section */}
      <section className="bg-gray-50 py-12 md:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-6 sm:grid-cols-2">
            <Card className="overflow-hidden rounded border bg-white hover:shadow">
              <CardContent className="p-6">
                <h2 className="text-2xl font-semibold text-gray-900">1. Daily Essentials & Groceries</h2>
                <p className="text-md mt-2 leading-relaxed text-gray-600">
                  From fresh food to packaged goods, Bhartiyam ensures you have access to everything your family needs
                  every day.
                </p>
                <p className="text-md mt-2 leading-relaxed text-gray-600">
                  <strong>Products include:</strong> Rice, pulses, grains, oils, spices, snacks, beverages, packaged
                  foods, and fresh produce.
                </p>
              </CardContent>
            </Card>

            <Card className="overflow-hidden rounded border bg-white hover:shadow">
              <CardContent className="p-6">
                <h2 className="text-2xl font-semibold text-gray-900">2. Household & Kitchen Products</h2>
                <p className="text-md mt-2 leading-relaxed text-gray-600">
                  We make homes complete with a wide range of household items and kitchen essentials.
                </p>
                <p className="text-md mt-2 leading-relaxed text-gray-600">
                  <strong>Products include:</strong> Cleaning supplies, detergents, kitchenware, storage solutions, home
                  care, and eco-friendly products.
                </p>
              </CardContent>
            </Card>

            <Card className="overflow-hidden rounded border bg-white hover:shadow">
              <CardContent className="p-6">
                <h2 className="text-2xl font-semibold text-gray-900">3. Personal Care & Wellness</h2>
                <p className="text-md mt-2 leading-relaxed text-gray-600">
                  Bhartiyam believes in promoting health, hygiene, and self-care with premium yet affordable products.
                </p>
                <p className="text-md mt-2 leading-relaxed text-gray-600">
                  <strong>Products include:</strong> Skincare, haircare, bath & hygiene, health supplements, and baby
                  care essentials.
                </p>
              </CardContent>
            </Card>

            <Card className="overflow-hidden rounded border bg-white hover:shadow">
              <CardContent className="p-6">
                <h2 className="text-2xl font-semibold text-gray-900">4. Digital & Lifestyle Products</h2>
                <p className="text-md mt-2 leading-relaxed text-gray-600">
                  We go beyond essentials by offering digital and lifestyle solutions for modern living.
                </p>
                <p className="text-md mt-2 leading-relaxed text-gray-600">
                  <strong>Products include:</strong> Mobile accessories, consumer electronics, smart home products, and
                  lifestyle gadgets.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Our Services Section */}
      <section className="bg-gray-100 py-12 md:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid items-center gap-8 lg:grid-cols-2 lg:gap-12">
            <div className="order-2 lg:order-1">
              <Image
                width={1000}
                height={1000}
                src="/images/product-service/img_10.webp"
                alt="Our Services at Bhartiyam"
                className="h-80 w-full rounded object-cover md:h-96"
              />
            </div>
            <div className="order-1 lg:order-2">
              <h2 className="mb-4 text-2xl font-semibold text-gray-900">Our Services</h2>
              <p className="mb-6 text-base leading-relaxed text-gray-700">
                In addition to a diverse product range, Bhartiyam provides a seamless shopping experience through
              </p>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <span className="mt-1 text-orange-600">•</span>
                  <span className="text-base leading-relaxed text-gray-700">
                    <strong>Online Shopping Platform</strong> – Shop anytime, anywhere
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-1 text-orange-600">•</span>
                  <span className="text-base leading-relaxed text-gray-700">
                    <strong>Offline Retail Stores</strong> – Experience our products firsthand
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-1 text-orange-600">•</span>
                  <span className="text-base leading-relaxed text-gray-700">
                    <strong>Fast Delivery Services</strong> – Quick and reliable order fulfillment
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-1 text-orange-600">•</span>
                  <span className="text-base leading-relaxed text-gray-700">
                    <strong>B2B Support</strong> – Wholesale and business solutions available
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Why Shop with Bhartiyam Section */}
      <section className="bg-white py-12 md:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid items-center gap-8 lg:grid-cols-2 lg:gap-12">
            <div>
              <h2 className="mb-4 text-2xl font-semibold text-gray-900">Why Shop with Bhartiyam?</h2>
              <p className="mb-6 text-base leading-relaxed text-gray-700">
                Whether you need{' '}
                <strong>
                  groceries for your home, wellness products for your family, or digital solutions for modern living
                </strong>
                , Bhartiyam has it all. Start shopping today with Bhartiyam – Where Quality Meets Affordability.
              </p>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <span className="text-orange-600">✓</span>
                  <span className="text-base leading-relaxed text-gray-700">High-quality FMCG and retail products</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-orange-600">✓</span>
                  <span className="text-base leading-relaxed text-gray-700">Affordable pricing for every budget</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-orange-600">✓</span>
                  <span className="text-base leading-relaxed text-gray-700">
                    Easy access across online and offline platforms
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-orange-600">✓</span>
                  <span className="text-base leading-relaxed text-gray-700">
                    Trusted by thousands of families and businesses nationwide
                  </span>
                </li>
              </ul>
            </div>
            <div>
              <Image
                width={1000}
                height={1000}
                src="/images/product-service/bgimg.webp"
                alt="Why Shop with Bhartiyam"
                className="h-80 w-full rounded object-cover md:h-96"
              />
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="bg-gray-50 py-12 md:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <FaqAboutus />
        </div>
      </section>

      {/* Contact Section */}
      <HomeContact />
    </>
  );
};

export default ProductService;
