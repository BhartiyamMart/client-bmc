import Image from 'next/image';

const HomeAbout = () => {
  return (
    <section className="m-auto max-w-[1539px] bg-white p-10 sm:px-10 md:px-10 lg:px-20">
      <div className="mx-auto py-6 md:py-6">
        <div className="grid grid-cols-1 items-center gap-8 md:grid-cols-12">
          {/* Text Section */}
          <div className="md:col-span-8">
            <h2 className="text-2xl font-semibold text-black md:text-3xl">
              About Bhartiyam – Aapka Daily Needs Partner
            </h2>
            <p className="mt-4 text-base leading-relaxed text-black md:text-lg">
              <b>Bhartiyam,</b> a proud brand of <b> Kamna Mart Private Limited</b>, is revolutionizing the Indian
              retail and <b> Fast Moving Consumer Goods (FMCG) market.</b> With a commitment to quality and
              affordability, customer satisfaction is our motto. We want to offer the best to our customers, whether
              packaged products, farm-fresh produced items, or authentic regional specialties. Our dedicated team works
              relentlessly to explore what consumers prefer and try to procure the best at a special price. We patronize
              a personalized shopping experience tailored to their needs. At{' '}
              <b>Bhartyiam - Aapka Daily Needs Partner </b>, we curate our list of products according to the demands and
              preferences of our customers. We ask questions to know them better - Do they prefer organic or traditional
              ingredients? Are they looking for convenience or culinary exploration? We ensure that all products meet
              their expectations in quality, taste, and value.
            </p>
            <p className="mt-2 text-base leading-relaxed text-black md:text-lg">
              With options like express checkout, home delivery, and seasonal promotions, we don’t just stock shelves -
              we craft solutions that make shopping joyful and memorable.
            </p>
            <a
              href="/about-us"
              className="mt-6 inline-flex items-center justify-center rounded-md bg-orange-600 px-5 py-2 text-sm font-medium text-white hover:bg-orange-700 focus:ring-2 focus:ring-orange-600 focus:ring-offset-2 focus:outline-none md:text-base"
            >
              View More
            </a>
          </div>

          {/* Image Section */}
          <div className="md:col-span-4">
            <Image
              width={500}
              height={500}
              src="/images/about-us/ab_slide01.webp"
              alt="Bhartiyam store visuals"
              className="h-auto w-full rounded-lg object-cover shadow-md"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HomeAbout;
