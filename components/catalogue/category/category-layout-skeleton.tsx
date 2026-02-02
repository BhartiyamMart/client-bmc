import Section from '@/components/shared/ui/section';
import Container from '@/components/shared/ui/container';
import { Skeleton } from '@/components/ui/skeleton';

const CategoryLayoutSkeleton = () => {
  return (
    <Section className="py-4">
      <Container className="relative flex h-auto min-h-[70vh] w-full flex-col overflow-hidden rounded border bg-white lg:h-[80vh] lg:flex-row">
        {/* Sidebar Skeleton */}
        <aside className="hidden h-full w-80 max-w-80 flex-col border-r bg-white lg:flex">
          {/* Header */}
          <div className="border-b px-4 py-4">
            <Skeleton className="h-6 w-32" />
          </div>

          {/* Categories */}
          <div className="flex-1 overflow-y-auto p-2">
            <div className="space-y-2">
              {Array.from({ length: 8 }).map((_, i) => (
                <div key={i} className="flex items-center gap-3 rounded-lg px-4 py-3">
                  <Skeleton className="h-8 w-8 rounded" />
                  <Skeleton className="h-4 flex-1" />
                </div>
              ))}
            </div>
          </div>

          {/* Footer */}
          <div className="border-t px-4 py-3">
            <Skeleton className="h-3 w-24" />
          </div>
        </aside>

        {/* Main Content Skeleton */}
        <main className="flex min-h-0 min-w-0 flex-1 flex-col overflow-hidden">
          {/* Header */}
          <div className="flex items-center gap-3 border-b px-4 py-3">
            <Skeleton className="h-5 w-5 rounded-full lg:hidden" />
            <Skeleton className="h-6 w-32" />
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto p-4 py-6">
            <div className="space-y-4">
              <Skeleton className="h-8 w-48" />
              <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
                {Array.from({ length: 8 }).map((_, i) => (
                  <Skeleton key={i} className="aspect-square w-full rounded-lg" />
                ))}
              </div>
            </div>
          </div>
        </main>
      </Container>
    </Section>
  );
};

export default CategoryLayoutSkeleton;
