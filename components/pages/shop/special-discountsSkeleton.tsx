import Container from '@/components/shared/ui/container';
import Section from '@/components/shared/ui/section';
import SectionTitle from '@/components/shared/ui/section-title';

const SpecialDiscountsSkeleton = () => {
  return (
    <Section>
      <Container>
        <SectionTitle title="Special Discounts" />

        <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6">
          {Array.from({ length: 3 }).map((_, index) => (
            <div
              key={index}
              className="flex flex-col justify-between rounded-xl border border-gray-200 bg-white p-3 sm:p-4"
            >
              <div className="rounded-lg bg-gray-100 p-2 text-center sm:p-3">
                <div className="mx-auto mb-2 h-4 w-20 animate-pulse rounded bg-gray-200 sm:h-5 sm:w-28" />
                <div className="mx-auto h-3 w-16 animate-pulse rounded bg-gray-200 sm:h-4 sm:w-24" />
              </div>

              <div className="mt-3 flex flex-1 items-center justify-center">
                <div className="h-30 w-30 animate-pulse rounded-lg bg-gray-200 sm:h-37.5 sm:w-37.5 md:h-45 md:w-45 lg:h-55 lg:w-55" />
              </div>
            </div>
          ))}
        </div>
      </Container>
    </Section>
  );
};

export default SpecialDiscountsSkeleton;
