// type Props = {

//     title: string

//     description: string

//     bullets?: string[]

//     ctaLabel?: string

//     image: string

//     imageLeft?: boolean

//     onCtaClick?: ()=>void

// }

// export function SplitFeature({ title, description, bullets, ctaLabel,  imageLeft }: Props) {

//     return (
//         <section className=" bg-[url('/img/766.jpg')] w-full  h-[90vh] bg-fixed  bg-contain bg-no-repeat">
//             <div

//                 className={`mx-auto grid grid-cols-12 gap-10 px-4 py-16  ${imageLeft ? "" : ""

//                     }`}
//             >

//                 <div className="col-span-12 md:col-span-4"></div>

//                 <div className="col-span-12 md:col-span-8 lg:col-span-8 md:col-start-5 p-6 sm:p-8 lg:p-12 bg-white rounded-lg shadow-md">
//                     <h2 className="text-2xl sm:text-2xl md:text-2xl lg:text-2xl font-semibold text-black">{title}</h2>
//                     <p className="mt-3 text-gray-900 leading-loose">{description}</p>

//                     {bullets && bullets.length > 0 && (
//                         <ul className="mt-4 list-disc space-y-1 pl-5 text-gray-700 leading-loose">

//                             {bullets.map((b) => (
//                                 <li key={b}>{b}</li>

//                             ))}
//                         </ul>

//                     )}

//                     {ctaLabel && (
//                         <a

//                             href="/product-service"

//                             className="mt-6 inline-flex items-center justify-center rounded-md bg-orange-600 px-4 py-2 text-sm font-medium text-white hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-orange-600 focus:ring-offset-2"
//                         >

//                             {ctaLabel}
//                         </a>

//                     )}
//                 </div>

//             </div>
//         </section>

//     )

// }

type Props = {
  title: string;
  description: string;
  bullets?: string[];
  ctaLabel?: string;
  ctaLink?: string; // 👉 new prop
  image: string;
  onCtaClick?: () => void;
};

export function SplitFeature({ title, description, bullets, ctaLabel, ctaLink, image }: Props) {
  return (
    <section className="} w-full bg-contain bg-fixed bg-no-repeat" style={{ backgroundImage: `url(${image})` }}>
      <div className={`mx-auto grid grid-cols-12 px-4 py-16`}>
        <div className="col-span-12 md:col-span-4"></div>

        <div className="col-span-12 rounded-lg bg-white p-6 shadow-md sm:p-8 md:col-span-12 lg:col-span-8 lg:p-12">
          <h2 className="text-2xl font-semibold text-black sm:text-2xl md:text-2xl lg:text-2xl">{title}</h2>
          <p className="mt-3 leading-loose text-gray-900">{description}</p>

          {bullets && bullets.length > 0 && (
            <ul className="mt-4 list-disc space-y-1 pl-5 leading-loose text-gray-700">
              {bullets.map((b) => (
                <li key={b}>{b}</li>
              ))}
            </ul>
          )}

          {ctaLabel && (
            <a
              href={ctaLink || '#'} // 👉 use dynamic link
              className="mt-6 inline-flex items-center justify-center rounded-md bg-orange-600 px-4 py-2 text-sm font-medium text-white hover:bg-orange-700 focus:ring-2 focus:ring-orange-600 focus:ring-offset-2 focus:outline-none"
            >
              {ctaLabel}
            </a>
          )}
        </div>
      </div>
    </section>
  );
}
