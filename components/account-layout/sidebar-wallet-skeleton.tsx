const SidebarWalletSkeleton = () => {
  return (
    <div className="mx-2 animate-pulse rounded border bg-white p-3 shadow-xs">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="h-5 w-5 rounded bg-gray-200"></div>
          <div className="h-5 w-32 rounded bg-gray-200"></div>
        </div>
        <div className="h-5 w-5 rounded bg-gray-200"></div>
      </div>

      <div className="mt-1 mb-3 border border-dashed border-gray-200"></div>

      <div className="flex items-center justify-between">
        <div className="flex items-baseline gap-1">
          <div className="h-6 w-16 rounded bg-gray-200"></div>
        </div>
        <div className="h-8 w-24 rounded bg-gray-200"></div>
      </div>
    </div>
  );
};

export default SidebarWalletSkeleton;
