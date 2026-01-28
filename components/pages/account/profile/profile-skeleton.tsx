const ProfileSkeleton = () => {
  return (
    <div className="animate-pulse">
      <div className="-mx-2 flex flex-wrap">
        {/* Name Field Skeleton */}
        <div className="mb-6 w-full px-2 md:w-1/2">
          <div className="mb-1 h-5 w-24 rounded bg-gray-200"></div>
          <div className="flex overflow-hidden rounded border border-gray-200">
            <span className="flex items-center border-r border-gray-200 bg-gray-100 px-2.5 py-2.5 sm:px-3">
              <div className="h-4 w-4 rounded bg-gray-300"></div>
            </span>
            <div className="h-10 w-full bg-gray-50"></div>
          </div>
        </div>

        {/* Email Field Skeleton */}
        <div className="mb-6 w-full px-2 md:w-1/2">
          <div className="mb-1 h-5 w-16 rounded bg-gray-200"></div>
          <div className="flex overflow-hidden rounded border border-gray-200">
            <span className="flex items-center border-r border-gray-200 bg-gray-100 px-2.5 py-2.5 sm:px-3">
              <div className="h-4 w-4 rounded bg-gray-300"></div>
            </span>
            <div className="h-10 w-full bg-gray-50"></div>
          </div>
        </div>

        {/* DOB Field Skeleton */}
        <div className="mb-6 w-full px-2 md:w-1/2">
          <div className="mb-1 h-5 w-28 rounded bg-gray-200"></div>
          <div className="flex overflow-hidden rounded border border-gray-200">
            <span className="flex items-center border-r border-gray-200 bg-gray-100 px-2.5 py-2.5 sm:px-3">
              <div className="h-4 w-4 rounded bg-gray-300"></div>
            </span>
            <div className="h-10 w-full bg-gray-50"></div>
          </div>
        </div>

        {/* Gender Field Skeleton */}
        <div className="mb-6 w-full px-2 md:w-1/2">
          <div className="mb-1 h-5 w-20 rounded bg-gray-200"></div>
          <div className="flex overflow-hidden rounded border border-gray-200">
            <span className="flex items-center border-r border-gray-200 bg-gray-100 px-2.5 py-2.5 sm:px-3">
              <div className="h-4 w-4 rounded bg-gray-300"></div>
            </span>
            <div className="h-10 w-full bg-gray-50"></div>
          </div>
        </div>

        {/* Save Button Skeleton */}
        <div className="mb-8 flex w-full justify-end px-2">
          <div className="h-9 w-32 rounded bg-gray-200"></div>
        </div>
      </div>

      {/* Danger Zone Skeleton */}
      <div className="border-t pt-8">
        <div className="mb-2 h-6 w-36 rounded bg-gray-200"></div>
        <div className="h-4 w-64 rounded bg-gray-100"></div>
      </div>
    </div>
  );
};

export default ProfileSkeleton;
