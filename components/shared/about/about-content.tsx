import Image from 'next/image';

const AboutContent = () => {
  return (
    <main id="about" className="mx-auto max-w-7xl">
      {/* Intro and Story */}
      <section className="space-y-8 px-5 pt-12 sm:px-10 lg:px-8 xl:px-8">
        <div className="grid grid-cols-1 gap-0 lg:grid-cols-12">
          {/* Image Section (first on mobile, second on large screens) */}
          <div className="order-1 mb-4 flex items-start justify-center lg:order-2 lg:col-span-4">
            <Image
              src="/images/about-us/img011.webp"
              width={1000}
              height={1000}
              alt="Our Vision"
              className="h-auto w-full rounded-xl shadow-md"
            />
          </div>

          {/* Text Section (second on mobile, first on large screens) */}
          <div className="order-2 lg:order-1 lg:col-span-8">
            <p className="text-base leading-relaxed text-black">
              <b> Bhartiyam </b>, a proud brand of <b> Kamna Mart Private Limited </b>, is revolutionizing the Indian
              retail and <b> Fast Moving Consumer Goods (FMCG) market </b>. With a commitment to quality and
              affordability, customer satisfaction is our motto. We want to offer the best to our customers, whether
              packaged products, farm-fresh produced items, or authentic regional specialties. Our dedicated team works
              relentlessly to explore what consumers prefer and try to procure the best at a special price. We patronize
              a personalized shopping experience tailored to their needs. At{' '}
              <b> Bhartyiam - Aapka Daily Needs Partner </b>, we curate our list of products according to the demands
              and preferences of our customers. We ask questions to know them better - Do they prefer organic or
              traditional ingredients? Are they looking for convenience or culinary exploration? We ensure that all
              products meet their expectations in quality, taste, and value.
            </p>

            <p className="mt-5">
              With options like express checkout, home delivery, and seasonal promotions, we don’t just stock shelves -
              we craft solutions that make shopping joyful and memorable.
            </p>

            <p className="mt-5">
              <b> Bhartiyam - Aapka Daily Needs Partner </b>, is a one-stop destination for households and businesses,
              empowering local communities while delivering unmatched value and convenience.
            </p>

            <p className="mt-5">
              We believe in the values and traditions of India, and we follow the path of{' '}
              <b> {`'vasudhaiva kutumbakam'`} (Earth is one family).</b>
            </p>

            <p className="mt-5">
              Empowering the <b> Indian consumers </b> with convenient access to high-quality <b> retail </b> and{' '}
              <b> fast moving consumer goods (FMCG) </b> at an affordable price, whether they buy packaged products,
              farm-fresh produce, or authentic regional specialties. We aim to procure and provide our customers with
              everything they need in the <b> FMCG segment </b>.
            </p>

            <p className="mt-5">
              By blending state-of-the-art tech innovation with tradition, we aspire to create a
              <b> hyperlocal e-commerce economy </b> that benefits our customers, partner merchants, and delivery
              partners.
            </p>
          </div>
        </div>

        {/* <div>
          <h2 className="text-2xl font-semibold text-black sm:text-3xl">Our Story</h2>
          <p className="mt-2 text-base leading-relaxed text-black sm:text-lg">
            Founded with a vision to <b>revolutionize the Indian retail and FMCG industry</b>, Bhartiyam has quickly
            become a trusted name among families and enterprises. By combining modern retail technology with traditional
            customer values, we ensure that every shopping experience is convenient, affordable, and reliable.
          </p>
        </div> */}
      </section>

      {/* Mission & Vision */}
      <section className="mt-10 grid grid-cols-1 gap-6 px-5 sm:px-0 md:grid-cols-2">
        <div className="rounded-lg border bg-white p-8 text-center shadow-sm sm:p-12">
          <Image
            src="/images/about-us/impact.gif"
            width={100}
            height={100}
            alt="Our Mission"
            className="mx-auto mb-4 w-24"
          />
          <h2 className="text-xl font-bold text-black sm:text-2xl">Our Mission</h2>
          <p className="mt-2 text-left text-base leading-relaxed text-black sm:text-lg">
            To make high-quality FMCG products and retail essentials accessible to every Indian household and business
            at affordable prices, while delivering a seamless shopping journey across online and offline channels.
          </p>
        </div>

        <div className="rounded-lg border bg-white p-8 text-center shadow-sm sm:p-12">
          <Image
            src="/images/about-us/strategy.gif"
            width={100}
            height={100}
            alt="Our Vision"
            className="mx-auto mb-4 w-24"
          />
          <h2 className="text-xl font-bold text-black sm:text-2xl">Our Vision</h2>
          <p className="mt-2 text-left text-base leading-relaxed text-black sm:text-lg">
            To become India’s most trusted and customer-centric retail brand, setting new benchmarks in FMCG innovation,
            affordability, and service excellence.
          </p>
        </div>
      </section>

      {/* Core Values & Why Bhartiyam */}
      <section className="mt-10 grid grid-cols-1 gap-6 px-5 sm:px-0 md:grid-cols-2">
        <div className="rounded-lg border bg-white p-8 shadow-sm sm:p-10">
          <h2 className="text-xl font-bold text-black sm:text-2xl">Our Core Values</h2>
          <ul className="mt-3 list-disc space-y-2 pl-5 text-base text-black sm:text-lg">
            <li>
              <b>Quality First</b> – Every product goes through strict quality checks.
            </li>
            <li>
              <b>Affordability for All</b> – Making premium products accessible at the best prices.
            </li>
            <li>
              <b>Customer Satisfaction</b> – Building long-lasting relationships with trust.
            </li>
            <li>
              <b>Innovation</b> – Integrating digital solutions for a smarter shopping experience.
            </li>
          </ul>
        </div>

        <div className="rounded-lg border bg-white p-8 shadow-sm sm:p-10">
          <h2 className="text-xl font-bold text-black sm:text-2xl">Why Bhartiyam?</h2>
          <ul className="mt-3 list-disc space-y-2 pl-5 text-base text-black sm:text-lg">
            <li>A wide network of retail and FMCG products across India.</li>
            <li>Seamless integration of online shopping and offline store formats.</li>
            <li>Trusted by thousands of families and businesses nationwide.</li>
            <li>Committed to sustainability and responsible retail practices.</li>
          </ul>
        </div>
      </section>
    </main>
  );
};

export default AboutContent;
