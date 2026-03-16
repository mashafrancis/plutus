import { Skeleton } from "@/components/ui/skeleton";

export function TransactionsTableSkeleton() {
  return (
    <div className="flex flex-col gap-4">
      {new Array(5).fill().map((_, i) => (
        <div className="flex items-center gap-4" key={i}>
          <Skeleton className="h-8 w-8 rounded-full" />
          <Skeleton className="h-4 flex-1" />
          <Skeleton className="h-4 w-20" />
          <Skeleton className="h-4 w-24" />
          <Skeleton className="h-4 w-20" />
        </div>
      ))}
    </div>
  );
}
