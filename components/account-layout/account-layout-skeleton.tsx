import Section from '@/components/shared/ui/section';
import Container from '@/components/shared/ui/container';

const AccountLayoutSkeleton = () => {
  return (
    <Section className="py-4">
      <Container className="relative flex h-auto w-full flex-col overflow-hidden rounded border bg-white lg:h-125 lg:min-h-125 lg:flex-row">
        {/* Sidebar Skeleton */}
        <aside className="hidden w-full flex-col border-r bg-white lg:flex lg:w-80 lg:max-w-80">
          {/* Profile Section Skeleton */}
          <div className="flex max-h-20 animate-pulse items-center gap-3 bg-white p-4">
            <div className="h-12 w-12 shrink-0 rounded-full bg-gray-300"></div>
            <div className="min-w-0 flex-1 space-y-2">
              <div className="h-4 w-32 rounded bg-gray-300"></div>
              <div className="h-3 w-24 rounded bg-gray-200"></div>
            </div>
          </div>

          {/* Wallet Section Skeleton */}
          <div className="mx-2 animate-pulse rounded border bg-white p-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="h-5 w-5 rounded bg-gray-300"></div>
                <div className="h-4 w-32 rounded bg-gray-300"></div>
              </div>
              <div className="h-5 w-5 rounded bg-gray-300"></div>
            </div>
            <div className="my-3 border-t border-dashed"></div>
            <div className="flex items-center justify-between">
              <div className="h-6 w-20 rounded bg-gray-300"></div>
              <div className="h-8 w-24 rounded bg-gray-300"></div>
            </div>
          </div>

          {/* Menu Items Skeleton */}
          <div className="min-h-0 flex-1 space-y-1 overflow-y-auto px-2 py-4">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="flex animate-pulse items-center gap-3 rounded px-4 py-3">
                <div className="h-5 w-5 shrink-0 rounded bg-gray-300"></div>
                <div className="h-4 flex-1 rounded bg-gray-300"></div>
              </div>
            ))}
          </div>
        </aside>

        {/* Main Content Skeleton */}
        <main className="flex min-h-0 min-w-0 flex-1 flex-col overflow-hidden">
          {/* Header Skeleton */}
          <header className="sticky top-0 z-10 flex animate-pulse items-center justify-between border-b bg-white p-4">
            <div className="flex w-full items-center gap-2">
              <div className="h-6 w-6 rounded bg-gray-300"></div>
              <div className="h-6 w-32 rounded bg-gray-300"></div>
            </div>
          </header>

          {/* Content Area Skeleton */}
          <div className="min-h-0 flex-1 overflow-y-auto p-4 py-6">
            <div className="animate-pulse space-y-4">
              {/* Two columns */}
              <div className="flex flex-wrap gap-4">
                <div className="h-14 flex-1 rounded bg-gray-200"></div>
                <div className="h-14 flex-1 rounded bg-gray-200"></div>
              </div>
              <div className="flex flex-wrap gap-4">
                <div className="h-14 flex-1 rounded bg-gray-200"></div>
                <div className="h-14 flex-1 rounded bg-gray-200"></div>
              </div>
              {/* Large field */}
              <div className="h-32 w-full rounded bg-gray-200"></div>
              {/* Button */}
              <div className="flex justify-end">
                <div className="h-12 w-32 rounded bg-gray-200"></div>
              </div>
            </div>
          </div>
        </main>
      </Container>
    </Section>
  );
};

export default AccountLayoutSkeleton;
