import Image from 'next/image';

const NavbarHero = () => {
  return (
    <section className="relative bg-white bg-[url('/images/heropage/slide_03.webp')] bg-cover bg-left bg-no-repeat py-5 md:py-5">
      <div className="mx-auto mt-5 grid max-w-[1539px] grid-cols-1 items-center gap-0 px-0 py-6 pb-0 sm:px-10 md:grid-cols-12 md:px-10 md:py-10 md:pb-8 lg:px-20">
        {/* Left Content */}
        <div className="col-span-12 p-2 pt-10 text-center md:col-span-12 md:text-left lg:col-span-8">
          <h1 className="text-lg font-medium tracking-wide text-gray-800 md:text-2xl xl:text-4xl">
            <b>Bhartiyam</b> –<span className="text-orange-500"> Aapka Daily Needs Partner </span>
          </h1>
          <p className="mt-2 text-2xl leading-snug font-bold text-gray-900 md:text-2xl md:leading-tight lg:text-4xl xl:text-5xl">
            One-Stop Shop for Your Needs, Delivered With Care
          </p>
          <p className="mt-8 text-base text-gray-600 md:text-xl">
            Experience Shopping as Never Before, Under One Roof, Online & Offline
          </p>

          {/* Buttons */}
          <div className="mt-6 flex flex-wrap justify-center gap-3 md:justify-start">
            {/* <a
              href="#"
              className="inline-flex items-center justify-center rounded-md bg-white px-5 py-2 text-sm font-medium text-gray-900 ring-1 ring-gray-300 hover:bg-gray-50 md:text-base"
            >
              Shop Online 
            </a>
            <a
              href="#"
              className="inline-flex items-center justify-center rounded-md bg-orange-600 px-5 py-2 text-sm font-medium text-white hover:bg-orange-700 focus:ring-2 focus:ring-orange-600 focus:ring-offset-2 focus:outline-none md:text-base"
            >
              Visit Our Store
            </a> */}
          </div>
        </div>

        {/* Right GIF/Image */}
        <div className="flex justify-center pt-0 md:col-span-4 md:justify-end md:pt-15 lg:col-span-4">
          <Image
            width={400}
            height={400}
            src="/images/heropage/1.webp"
            alt="Mart"
            className="invisible hidden h-[470px] w-[470px] rounded-lg object-cover lg:block"
          />
        </div>
      </div>
    </section>
  );
};

export default NavbarHero;
