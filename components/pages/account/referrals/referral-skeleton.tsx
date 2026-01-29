const ReferralSkeleton = () => {
  return (
    <div className="animate-pulse space-y-6">
      {/* Empty State Skeleton */}
      <div className="flex min-h-100 flex-col items-center justify-center space-y-4 py-12">
        <div className="h-20 w-20 rounded-full bg-gray-200"></div>
        <div className="space-y-2 text-center">
          <div className="h-7 w-48 rounded bg-gray-200"></div>
          <div className="h-5 w-96 rounded bg-gray-100"></div>
        </div>
        <div className="h-10 w-40 rounded bg-gray-200"></div>
      </div>

      {/* How it Works Skeleton */}
      <div className="space-y-4">
        <div>
          <div className="mb-2 h-6 w-40 rounded bg-gray-200"></div>
          <div className="h-4 w-56 rounded bg-gray-100"></div>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          {[1, 2, 3].map((index) => (
            <div key={index} className="flex flex-col items-start gap-3 md:items-center">
              <div className="h-10 w-10 rounded-full bg-gray-200"></div>
              <div className="flex-1 space-y-2 text-left md:text-center">
                <div className="h-5 w-32 rounded bg-gray-200"></div>
                <div className="h-4 w-full rounded bg-gray-100"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ReferralSkeleton;
