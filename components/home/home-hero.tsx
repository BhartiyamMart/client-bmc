const HomeHero = () => {
  return (
    <section className="relative bg-white bg-[url('/images/heropage/slide_03.webp')] bg-cover bg-left bg-no-repeat py-5 sm:py-10 md:py-20 lg:py-32 xl:py-36">
      <div className="mx-auto mt-5 grid max-w-[1539px] grid-cols-1 items-center gap-0 px-0 py-6 sm:px-10 md:grid-cols-12 md:px-10 md:py-10 lg:px-20">
        {/* Left Content */}
        <div className="col-span-12 p-2 pt-10 text-center md:text-left lg:col-span-8">
          <h1 className="text-lg font-medium tracking-wide text-black md:text-2xl xl:text-4xl">
            <b>Bhartiyam</b> –<span className="text-primary"> Aapka Daily Needs Partner </span>
          </h1>

          <p className="mt-2 text-2xl leading-snug font-bold text-gray-900 md:text-2xl md:leading-tight lg:text-4xl xl:text-5xl">
            One-Stop Shop for Your Needs, Delivered With Care
          </p>

          <p className="mt-8 text-base text-gray-600 md:text-xl">
            Experience Shopping as Never Before, Under One Roof, Online & Offline
          </p>
        </div>
      </div>
    </section>
  );
};

export default HomeHero;
