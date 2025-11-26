import Image from 'next/image';
import Container from '@/components/shared/ui/container';

const HomeAbout = () => {
  return (
    <Container className="mx-auto bg-white px-5 py-16 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 items-center gap-12 md:grid-cols-12">
        {/* Text Section */}
        <div className="md:col-span-7">
          <h2 className="text-3xl leading-snug font-bold text-gray-900 md:text-3xl">
            Bhartiyam — Apka Daily Needs Partner
          </h2>

          <p className="mt-6 text-lg leading-relaxed text-gray-700">
            <b>Bhartiyam</b>, a proud brand of
            <b> Kamna Mart Private Limited</b>, is revolutionizing the Indian retail and
            <b> Fast Moving Consumer Goods (FMCG) market. </b> With a commitment to quality and affordability, customer
            satisfaction is our motto. We want to offer the best to our customers, whether packaged products, farm-fresh
            produced items, or authentic regional specialties. Our dedicated team works relentlessly to explore what
            consumers prefer and try to procure the best at a special price.
          </p>

          <p className="mt-4 text-lg leading-relaxed text-gray-700">
            We patronize a personalized shopping experience tailored to their needs. At
            <b> Bhartyiam - Aapka Daily Needs Partner </b> , we curate our list of products according to the demands and
            preferences of our customers. We ask questions to know them better - Do they prefer organic or traditional
            ingredients? Are they looking for convenience or culinary exploration? We ensure that all products meet
            their expectations in quality, taste, and value.
          </p>

          <p className="mt-4 text-lg leading-relaxed text-gray-700">
            With options like express checkout, home delivery, and seasonal promotions, we don’t just stock shelves - we
            craft solutions that make shopping joyful and memorable.
          </p>

          <div className="mt-8">
            <a
              href="/about-us"
              className="bg-primary hover:bg-primary/90 focus:ring-none inline-flex items-center justify-center rounded px-6 py-3 text-base font-medium text-white transition-all duration-200 focus:outline-none"
            >
              View More
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
