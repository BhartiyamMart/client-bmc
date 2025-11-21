import { ISplitFeatureProps } from '@/interfaces/shared.interface';
import Link from 'next/link';

const SplitFeature: React.FC<ISplitFeatureProps> = ({ title, description, bullets, ctaLabel, ctaLink, image }) => {
  return (
    <section className="} w-full bg-contain bg-fixed bg-no-repeat" style={{ backgroundImage: `url(${image})` }}>
      <div className={`mx-auto grid grid-cols-12 px-4 py-16`}>
        <div className="col-span-12 md:col-span-4"></div>

        <div className="col-span-12 rounded bg-white p-6 sm:p-8 md:col-span-12 lg:col-span-8 lg:p-12">
          <h2 className="text-2xl font-semibold text-black sm:text-2xl md:text-2xl lg:text-2xl">{title}</h2>
          <p className="mt-3 leading-loose text-black">{description}</p>

          {bullets && bullets.length > 0 && (
            <ul className="mt-4 list-disc space-y-1 pl-5 leading-loose text-gray-700">
              {bullets.map((b) => (
                <li key={b}>{b}</li>
              ))}
            </ul>
          )}

          {ctaLabel && (
            <div className="pt-6">
              <Link
                href={ctaLink || '#'}
                className="bg-primary hover:bg-primary/90 focus:ring-none rounded px-5 py-2 text-sm font-medium text-white focus:ring-offset-2 focus:outline-none md:text-base"
              >
                {ctaLabel}
              </Link>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default SplitFeature;
