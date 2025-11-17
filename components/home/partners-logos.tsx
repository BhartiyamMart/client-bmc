import { LogosScroller } from '@/components/home/logos-scroller';

const PartnersLogos = () => {
  return (
    <section className="w-full bg-white px-4 sm:px-6 md:px-12 lg:px-20">
      <div className="mx-auto py-12 md:py-20">
        <h2 className="text-center text-2xl font-semibold text-gray-900 md:text-3xl">Partners With Us</h2>
        <p className="mt-2 text-center text-gray-600">
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
