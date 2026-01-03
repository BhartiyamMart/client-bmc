const CategoryBannerSkeleton = () => {
  return (
    <section className="w-full py-4">
      <div className="container mx-auto max-w-372.5 px-4">
        <div className="hidden w-full grid-cols-3 gap-4 lg:grid">
          {Array.from({ length: 3 }).map((_, index) => (
            <div key={index} className="relative aspect-3/2 w-full animate-pulse rounded-xl bg-gray-200" />
          ))}
        </div>

        <div className="scrollbar-hide flex w-full gap-4 overflow-x-auto lg:hidden">
          {Array.from({ length: 3 }).map((_, index) => (
            <div
              key={index}
              className="relative aspect-3/2 w-[90%] shrink-0 animate-pulse rounded-xl bg-gray-200 sm:w-[48%]"
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategoryBannerSkeleton;
