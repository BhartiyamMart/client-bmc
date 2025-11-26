import Image from 'next/image';
import Container from '@/components/shared/ui/container';

const AboutContent = () => {
  return (
    <Container id="about" className="mx-auto">
      {/* Intro and Story */}
      <section className="px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-12">
          {/* Image Section (first on mobile, second on large screens) */}
          <div className="order-1 flex items-start justify-center lg:order-2 lg:col-span-5">
            <Image
              src="/images/about-us/img011.webp"
              width={1000}
              height={1000}
              alt="Bhartiyam - Our Vision"
              className="h-auto w-full rounded"
              priority
            />
          </div>

          {/* Text Section (second on mobile, first on large screens) */}
          <div className="order-2 space-y-5 lg:order-1 lg:col-span-7">
            <p className="text-base leading-7 text-gray-800 sm:leading-8">
              <span className="font-semibold text-gray-900">Bhartiyam</span>, a proud brand of{' '}
              <span className="font-semibold text-gray-900">Kamna Mart Private Limited</span>, is revolutionizing the
              Indian retail and{' '}
              <span className="font-semibold text-gray-900">Fast Moving Consumer Goods (FMCG) market</span>. With a
              commitment to quality and affordability, customer satisfaction is our motto. We want to offer the best to
              our customers, whether packaged products, farm-fresh produced items, or authentic regional specialties.
              Our dedicated team works relentlessly to explore what consumers prefer and try to procure the best at a
              special price. We patronize a personalized shopping experience tailored to their needs.
            </p>

            <p className="text-base leading-7 text-gray-800 sm:leading-8">
              At <span className="font-semibold text-gray-900">Bhartiyam - Aapka Daily Needs Partner</span>, we curate
              our list of products according to the demands and preferences of our customers. We ask questions to know
              them better - Do they prefer organic or traditional ingredients? Are they looking for convenience or
              culinary exploration? We ensure that all products meet their expectations in quality, taste, and value.
            </p>

            <p className="text-base leading-7 text-gray-800 sm:leading-8">
              With options like express checkout, home delivery, and seasonal promotions, we don't just stock shelves -
              we craft solutions that make shopping joyful and memorable.
            </p>

            <p className="text-base leading-7 text-gray-800 sm:leading-8">
              <span className="font-semibold text-gray-900">Bhartiyam - Aapka Daily Needs Partner</span>, is a one-stop
              destination for households and businesses, empowering local communities while delivering unmatched value
              and convenience.
            </p>

            <p className="text-base leading-7 text-gray-800 sm:leading-8">
              We believe in the values and traditions of India, and we follow the path of{' '}
              <span className="font-semibold text-gray-900">'vasudhaiva kutumbakam'</span> (Earth is one family).
            </p>

            <p className="text-base leading-7 text-gray-800 sm:leading-8">
              Empowering the <span className="font-semibold text-gray-900">Indian consumers</span> with convenient
              access to high-quality <span className="font-semibold text-gray-900">retail</span> and{' '}
              <span className="font-semibold text-gray-900">fast moving consumer goods (FMCG)</span> at an affordable
              price, whether they buy packaged products, farm-fresh produce, or authentic regional specialties. We aim
              to procure and provide our customers with everything they need in the{' '}
              <span className="font-semibold text-gray-900">FMCG segment</span>.
            </p>

            <p className="text-base leading-7 text-gray-800 sm:leading-8">
              By blending state-of-the-art tech innovation with tradition, we aspire to create a{' '}
              <span className="font-semibold text-gray-900">hyperlocal e-commerce economy</span> that benefits our
              customers, partner merchants, and delivery partners.
            </p>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:gap-8">
          <div className="rounded-md border-2 bg-white p-6 transition-shadow hover:shadow sm:p-10 lg:p-12">
            <div className="flex flex-col items-center">
              <Image
                src="/images/about-us/impact.gif"
                width={96}
                height={96}
                alt="Our Mission"
                className="mb-6 h-24 w-24"
              />
              <h2 className="mb-4 text-2xl font-bold text-gray-900 sm:text-3xl">Our Mission</h2>
              <p className="text-center text-base leading-7 text-gray-700 sm:leading-8">
                To make high-quality FMCG products and retail essentials accessible to every Indian household and
                business at affordable prices, while delivering a seamless shopping journey across online and offline
                channels.
              </p>
            </div>
          </div>

          <div className="rounded-md border-2 bg-white p-6 transition-shadow hover:shadow sm:p-10 lg:p-12">
            <div className="flex flex-col items-center">
              <Image
                src="/images/about-us/strategy.gif"
                width={96}
                height={96}
                alt="Our Vision"
                className="mb-6 h-24 w-24"
              />
              <h2 className="mb-4 text-2xl font-bold text-gray-900 sm:text-3xl">Our Vision</h2>
              <p className="text-center text-base leading-7 text-gray-700 sm:leading-8">
                To become India's most trusted and customer-centric retail brand, setting new benchmarks in FMCG
                innovation, affordability, and service excellence.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Core Values & Why Bhartiyam */}
      <section className="px-4 pb-16 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:gap-8">
          <div className="rounded-md border-2 bg-white p-6 transition-shadow hover:shadow sm:p-10 lg:p-12">
            <h2 className="mb-6 text-2xl font-bold text-gray-900 sm:text-3xl">Our Core Values</h2>

            <ul className="space-y-4">
              <li className="flex items-start gap-3 text-base leading-7 text-gray-700 sm:leading-8">
                <span className="text-black w-3 flex justify-center">•</span>
                <span>
                  <span className="font-semibold text-gray-900">Quality First</span> – Every product goes through strict
                  quality checks.
                </span>
              </li>

              <li className="flex items-start gap-3 text-base leading-7 text-gray-700 sm:leading-8">
                <span className="text-black w-3 flex justify-center">•</span>
                <span>
                  <span className="font-semibold text-gray-900">Affordability for All</span> – Making premium products
                  accessible at the best prices.
                </span>
              </li>

              <li className="flex items-start gap-3 text-base leading-7 text-gray-700 sm:leading-8">
                <span className="text-black w-3 flex justify-center">•</span>
                <span>
                  <span className="font-semibold text-gray-900">Customer Satisfaction</span> – Building long-lasting
                  relationships with trust.
                </span>
              </li>

              <li className="flex items-start gap-3 text-base leading-7 text-gray-700 sm:leading-8">
                <span className="text-black w-3 flex justify-center">•</span>
                <span>
                  <span className="font-semibold text-gray-900">Innovation</span> – Integrating digital solutions for a
                  smarter shopping experience.
                </span>
              </li>
            </ul>
          </div>


          <div className="rounded-md border-2 bg-white p-6 transition-shadow hover:shadow sm:p-10 lg:p-12">
            <h2 className="mb-6 text-2xl font-bold text-gray-900 sm:text-3xl">Why Bhartiyam?</h2>
            <ul className="space-y-4">
              <li className="flex gap-3 text-base leading-7 text-gray-700 sm:leading-8">
                <span className="mt-1 text-black">•</span>
                <span>A wide network of retail and FMCG products across India.</span>
              </li>
              <li className="flex gap-3 text-base leading-7 text-gray-700 sm:leading-8">
                <span className="mt-1 text-black">•</span>
                <span>Seamless integration of online shopping and offline store formats.</span>
              </li>
              <li className="flex gap-3 text-base leading-7 text-gray-700 sm:leading-8">
                <span className="mt-1 text-black">•</span>
                <span>Trusted by thousands of families and businesses nationwide.</span>
              </li>
              <li className="flex gap-3 text-base leading-7 text-gray-700 sm:leading-8">
                <span className="mt-1 text-black">•</span>
                <span>Committed to sustainability and responsible retail practices.</span>
              </li>
            </ul>
          </div>
        </div>
      </section>
    </Container>
  );
};

export default AboutContent;
