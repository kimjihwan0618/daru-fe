import { AppHeader } from "@/components/layout/app-header";
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export function DashboardSkeleton() {
  return (
    <div className="min-h-screen">
      <AppHeader />
      <main className="mx-auto max-w-[1540px] px-4 py-5 sm:px-8 sm:py-8">
        <div className="mb-5 flex justify-between"><Skeleton className="h-5 w-32" /><Skeleton className="h-7 w-28 rounded-full" /></div>
        <div className="grid gap-5 xl:grid-cols-[minmax(0,2.05fr)_minmax(330px,0.95fr)]">
          <Card className="grid gap-7 p-7 lg:grid-cols-2"><div className="space-y-5"><Skeleton className="h-7 w-28 rounded-full" /><Skeleton className="h-9 w-52" /><Skeleton className="h-5 w-32" /><Skeleton className="mt-8 h-14 w-4/5" /><Skeleton className="h-5 w-3/5" /><div className="flex gap-3"><Skeleton className="h-12 w-36" /><Skeleton className="h-12 w-24" /></div></div><Skeleton className="min-h-[280px] rounded-2xl" /></Card>
          <Card className="space-y-5 p-7"><Skeleton className="h-7 w-36" />{[0, 1, 2].map((item) => <div key={item} className="flex items-center justify-between border-b border-[#edf1f5] pb-5"><div className="space-y-2"><Skeleton className="h-5 w-24" /><Skeleton className="h-3 w-32" /></div><Skeleton className="h-8 w-28" /></div>)}</Card>
        </div>
        <div className="mt-5 grid gap-5 xl:grid-cols-[minmax(0,2.05fr)_minmax(330px,0.95fr)]"><Card className="space-y-3 p-7"><Skeleton className="mb-5 h-7 w-64" />{[0, 1, 2].map((item) => <Skeleton key={item} className="h-16 w-full" />)}</Card><Card className="space-y-4 p-7"><Skeleton className="h-7 w-32" />{[0, 1, 2].map((item) => <Skeleton key={item} className="h-14 w-full" />)}</Card></div>
      </main>
    </div>
  );
}
