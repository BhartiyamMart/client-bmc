const ReturnPolicy = () => {
  return (
    <>
      {/* Header Section */}
      <section className="bg-gray-100">
        <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
          <h1 className="text-2xl font-semibold text-balance text-black sm:text-2xl md:text-3xl">Return Policy</h1>
        </div>
      </section>

      {/* Content Section */}
      <section className="bg-white py-12 md:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <p className="text-base leading-relaxed text-gray-700">
            Customer's satisfaction is of utmost importance to us at Bhartiyam. We value our customer and try to resolve
            your problem within 30-minutes from receiving your complaint. Please have a look at our returning policy.
          </p>

          <h2 className="mt-8 text-xl font-semibold text-gray-900">
            Bhartiyam offers a 30-minute return and exchange service for all products
          </h2>

          <p className="mt-4 text-base leading-relaxed text-gray-700">
            A standard 'Term & Conditions' return policy will be applicable for other issues which states that products
            are non-returnable unless they are:
          </p>

          <ul className="mt-6 space-y-3 pl-6 text-base leading-relaxed text-gray-700">
            <li className="flex gap-2">
              <span className="text-black">•</span>
              <span className="font-semibold">Damaged</span>
            </li>
            <li className="flex gap-2">
              <span className="text-black">•</span>
              <span className="font-semibold">Defective</span>
            </li>
            <li className="flex gap-2">
              <span className="text-black">•</span>
              <span className="font-semibold">Date expired</span>
            </li>
            <li className="flex gap-2">
              <span className="text-black">•</span>
              <span className="font-semibold">Incorrect or wrong item delivered</span>
            </li>
          </ul>

          <p className="mt-6 text-base leading-relaxed text-gray-700">
            In order to initiate a return, customers should use the 'Need Help' or 'Raise a Complaint' option in the 'My
            Orders' section of the Bhartiyam website.
          </p>

          <p className="mt-4 text-sm text-gray-600 italic">
            (The names of the section are suggested and are subjected to discussion for final take.)
          </p>
        </div>
      </section>
    </>
  );
};

export default ReturnPolicy;
