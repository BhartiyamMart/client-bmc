import { LogosScroller } from '@/components/home/logos-scroller';

const PartnersLogos = () => {
  return (
    <section className="w-full bg-white px-4 sm:px-6 md:px-12 lg:px-20">
      <div className="mx-auto py-12 text-center md:py-20">
        <h2 className="text-2xl font-bold text-gray-900 sm:text-3xl lg:text-4xl">Partners With Us</h2>
        <p className="mx-auto mt-2 max-w-2xl text-base text-gray-600 sm:text-lg">
          We Work With Farmers, Suppliers, Distributors, and Retailers to Create a Strong Ecosystem.
        </p>
        <div className="mt-8">
          <LogosScroller />
        </div>
      </div>
    </section>
  );
};

export default PartnersLogos;
