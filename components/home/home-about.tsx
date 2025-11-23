import Image from 'next/image';
import Container from '@/components/shared/ui/container';

const HomeAbout = () => {
  return (
    <Container className="mx-auto bg-white px-5 py-16 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 items-center gap-12 md:grid-cols-12">
        {/* Text Section */}
        <div className="md:col-span-7">
          <h2 className="text-3xl leading-snug font-bold text-gray-900 md:text-3xl">
            Bhartiyam — Your Trusted Daily Needs Partner
          </h2>

          <p className="mt-6 text-lg leading-relaxed text-gray-700">
            <b>Bhartiyam</b>, a proud initiative of
            <b> Kamna Mart Private Limited</b>, is reshaping India&apos;s
            <b> retail and FMCG landscape</b> with an unwavering commitment to quality, affordability, and customer
            delight.
          </p>

          <p className="mt-4 text-lg leading-relaxed text-gray-700">
            From packaged essentials to farm-fresh produce and authentic regional specialties, our dedicated team
            curates products that resonate with your lifestyle. We understand what consumers truly want — whether
            organic staples, traditional ingredients, or exploratory flavors — and we bring the best to your doorstep at
            the best prices.
          </p>

          <p className="mt-4 text-lg leading-relaxed text-gray-700">
            With seamless express checkout, fast home delivery, and exciting seasonal offers, we don&apos;t just deliver
            products —<b> we deliver convenience, trust, and happiness.</b>
          </p>

          <div className="mt-8">
            <a
              href="/about-us"
              className="bg-primary hover:bg-primary/90 focus:ring-none inline-flex items-center justify-center rounded px-6 py-3 text-base font-medium text-white transition-all duration-200 focus:outline-none"
            >
              Learn More About Us
            </a>
          </div>
        </div>

        {/* Image Section */}
        <div className="flex justify-center md:col-span-5 md:justify-end">
          <div className="w-full max-w-[420px] overflow-hidden rounded md:max-w-[480px] lg:max-w-[520px]">
            <Image
              src="/images/about-us/ab_slide01.webp"
              alt="Bhartiyam store visuals"
              width={600}
              height={600}
              className="h-auto w-full object-cover transition-transform duration-300"
              sizes="(max-width: 768px) 80vw, (max-width: 1200px) 40vw, 500px"
            />
          </div>
        </div>
      </div>
    </Container>
  );
};

export default HomeAbout;
