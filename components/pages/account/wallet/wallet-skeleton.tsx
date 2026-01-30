export const WalletEmptySkeleton = () => {
  return (
    <div className="animate-pulse space-y-6">
      {/* Empty State Skeleton */}
      <div className="flex min-h-100 flex-col items-center justify-center space-y-4 py-12">
        <div className="h-20 w-20 rounded-full bg-gray-200"></div>
        <div className="space-y-2 text-center">
          <div className="mx-auto h-7 w-48 rounded bg-gray-200"></div>
          <div className="mx-auto h-5 w-80 max-w-full rounded bg-gray-100"></div>
        </div>
        <div className="h-10 w-40 rounded bg-gray-200"></div>
      </div>

      {/* How it Works Skeleton */}
      <div className="space-y-4">
        <div>
          <div className="mb-2 h-6 w-40 rounded bg-gray-200"></div>
          <div className="h-4 w-64 rounded bg-gray-100"></div>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          {[1, 2, 3].map((index) => (
            <div key={index} className="flex flex-col items-start gap-3 md:items-center">
              <div className="h-10 w-10 rounded-full bg-gray-200"></div>
              <div className="w-full flex-1 space-y-2 text-left md:text-center">
                <div className="h-5 w-32 rounded bg-gray-200 md:mx-auto"></div>
                <div className="h-4 w-full rounded bg-gray-100 md:mx-auto md:w-40"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export const WalletLoadedSkeleton = () => {
  return (
    <div className="animate-pulse bg-gray-50 sm:bg-white">
      <div className="">
        {/* Main Wallet Section */}
        <div className="space-y-4 border-gray-200 bg-white">
          {/* Balance Skeleton */}
          <div className="space-y-2 sm:space-y-4">
            <div className="h-4 w-32 rounded bg-gray-200"></div>
            <div className="h-8 w-40 rounded bg-gray-200 sm:h-10 sm:w-48"></div>
          </div>

          {/* Input Box Skeleton */}
          <div className="space-y-3 sm:space-y-4">
            <div className="space-y-2">
              <div className="flex h-11 w-full overflow-hidden rounded border border-gray-200 bg-gray-50">
                <div className="w-10 border-r border-gray-200 bg-gray-100"></div>
                <div className="flex-1"></div>
              </div>
            </div>

            {/* Quick Amount Buttons Skeleton */}
            <div className="space-y-2">
              <div className="flex flex-wrap gap-1.5 sm:gap-2">
                {[1, 2, 3, 4, 5, 6, 7].map((i) => (
                  <div key={i} className="h-8 w-20 rounded bg-gray-200 sm:h-10 sm:w-24"></div>
                ))}
              </div>
            </div>

            {/* Note Text Skeleton */}
            <div className="h-3 w-56 rounded bg-gray-100"></div>
          </div>

          {/* Button Skeleton */}
          <div className="h-10 w-full rounded bg-gray-200"></div>

          {/* Warning Box Skeleton */}
          <div className="rounded border border-gray-200 bg-gray-50 p-3 sm:p-4">
            <div className="flex items-start gap-2 sm:gap-3">
              <div className="mt-0.5 h-4 w-4 shrink-0 rounded bg-gray-200 sm:h-5 sm:w-5"></div>
              <div className="min-w-0 flex-1 space-y-2">
                <div className="h-4 w-28 rounded bg-gray-200"></div>
                <div className="h-3 w-full rounded bg-gray-100"></div>
              </div>
            </div>
          </div>
        </div>

        {/* Transaction History Skeleton */}
        <div className="mt-10 space-y-4">
          <div className="h-6 w-40 rounded bg-gray-200"></div>

          {/* Transaction Items Skeleton */}
          <div className="space-y-3">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="flex items-center justify-between rounded border border-gray-200 p-3 sm:p-4">
                <div className="flex items-center gap-3 sm:gap-4">
                  <div className="h-9 w-9 rounded-full bg-gray-200"></div>
                  <div className="space-y-2">
                    <div className="h-4 w-32 rounded bg-gray-200"></div>
                    <div className="h-3 w-24 rounded bg-gray-100"></div>
                  </div>
                </div>
                <div className="flex flex-col items-end gap-2">
                  <div className="h-5 w-20 rounded bg-gray-200"></div>
                  <div className="h-5 w-16 rounded-full bg-gray-100"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
