import React from 'react';

const DownloadApp: React.FC = () => {
  return (
    <section className="mx-auto max-w-[1539px] overflow-hidden bg-orange-500">
      <div className="flex items-center justify-between px-6 py-10 md:px-20">
        {/* Marquee Text */}
        <div className="w-full overflow-hidden">
          <h2 className="animate-marquee text-lg font-bold whitespace-nowrap text-white md:text-2xl">
            Shop Smarter – Fresh, Affordable, and Premium Groceries at Bhartiyam
          </h2>
        </div>

        {/* Button */}
        {/* <a
          href="#"
          className="ml-6 shrink-0 rounded-md bg-white px-5 py-2 font-medium text-black shadow-md transition hover:bg-gray-100"
        >
          Shop Now
        </a> */}
      </div>
      {/* CSS inside page */}
      <style jsx>{`
        @keyframes marquee {
          0% {
            transform: translateX(100%);
          }
          100% {
            transform: translateX(-100%);
          }
        }
        .animate-marquee {
          display: inline-block;
          animation: marquee 12s linear infinite;
        }
      `}</style>
    </section>
  );
};

export default DownloadApp;
