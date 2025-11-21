import { Clock } from '../svg/svg-icon';
import CareerForm from './career-form';

const CareerPage = () => {
  return (
    <>
      <section className="bg-gray-100">
        <div className="mx-auto mt-20 max-w-[1539px] px-5 pt-10 pb-10 sm:mt-25 sm:px-0 md:mt-25 lg:mt-25 lg:px-25">
          <h1 className="text-2xl font-bold text-balance text-black sm:text-2xl md:text-3xl">Career</h1>
        </div>
      </section>

      <section className="bg-white">
        <div className="mx-auto max-w-[1539px] px-5 pt-10 pb-10 leading-loose lg:px-25">
          <div className="w-full leading-loose">
            <div className="grid grid-cols-12 gap-5">
              <div className="col-span-8">
                <h2 className="mb-1 text-2xl font-bold text-black">{`We're`} Hiring!</h2>
                <p className="mb-5 text-gray-700">
                  {`We're`} looking for passionate people to join us on our mission. We value flat hierarchies, clear
                  communication, and full ownership and responsibility.
                </p>

                <div className="mb-5 w-full border p-3">
                  <p className="text-lg font-bold text-black">Product Designer</p>
                  <p>{`We're`} looking for a mid-level product designer to join our team</p>
                  <button className="flex items-center border px-3 py-1 text-sm">
                    {' '}
                    <Clock className="mr-2 w-4" /> Full Time
                  </button>
                </div>
                <div className="mb-5 w-full border p-3">
                  <p className="text-lg font-bold text-black">Customer Success Manager</p>
                  <p>{`We're`} looking for a mid-level Customer Success Manager to join our team</p>
                  <button className="flex items-center border px-3 py-1 text-sm">
                    {' '}
                    <Clock className="mr-2 w-4" /> Full Time
                  </button>
                </div>
              </div>
              <div className="col-span-4">
                <CareerForm />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default CareerPage;
