import { Skeleton } from "@/components/ui/skeleton";

export function LoadingTable({ rows = 6, cols = 6 }: { rows?: number; cols?: number }) {
  return (
    <div className="space-y-2">
      {Array.from({ length: rows }).map((_, r) => (
        <div
          key={r}
          className="grid items-center gap-3 rounded-md border border-border/60 bg-card px-3 py-3"
          style={{ gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))` }}
        >
          {Array.from({ length: cols }).map((_, c) => (
            <Skeleton key={c} className="h-3 w-3/4" />
          ))}
        </div>
      ))}
    </div>
  );
}
