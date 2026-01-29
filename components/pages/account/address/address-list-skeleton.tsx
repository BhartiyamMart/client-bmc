const AddressListSkeleton = () => {
  return (
    <div className="space-y-3">
      {[1, 2, 3].map((i) => (
        <div key={i} className="animate-pulse rounded-lg border-2 border-gray-200 p-4 md:p-5">
          <div className="flex items-start gap-3 md:gap-4">
            {/* Radio skeleton */}
            <div className="mt-1 h-5 w-5 shrink-0 rounded-full bg-gray-200" />

            {/* Content skeleton */}
            <div className="min-w-0 flex-1 space-y-3">
              {/* Badge skeleton */}
              <div className="flex items-center gap-2">
                <div className="h-6 w-20 rounded-md bg-gray-200" />
                {i === 1 && <div className="h-6 w-16 rounded-md bg-orange-100" />}
              </div>

              {/* Address text skeleton */}
              <div className="space-y-2">
                <div className="h-4 w-full rounded bg-gray-200" />
                <div className="h-4 w-4/5 rounded bg-gray-200" />
              </div>

              {/* Contact info skeleton */}
              <div className="flex items-center gap-3">
                <div className="h-3 w-24 rounded bg-gray-200" />
                <div className="h-3 w-3 rounded-full bg-gray-200" />
                <div className="h-3 w-28 rounded bg-gray-200" />
              </div>
            </div>

            {/* Action buttons skeleton */}
            <div className="flex shrink-0 gap-1 md:gap-2">
              <div className="h-9 w-9 rounded bg-gray-200" />
              <div className="h-9 w-9 rounded bg-gray-200" />
            </div>
          </div>
        </div>
      ))}

      {/* Add button skeleton */}
      <div className="h-16 w-full rounded-lg border-2 border-dashed border-gray-200 bg-gray-50" />
    </div>
  );
};

export default AddressListSkeleton;
