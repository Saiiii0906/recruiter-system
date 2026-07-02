import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import type { LucideIcon } from "lucide-react";

interface StatCardProps {
  label: string;
  value: string;
  delta?: { value: string; positive?: boolean };
  icon: LucideIcon;
  loading?: boolean;
  className?: string;
}

export function StatCard({ label, value, delta, icon: Icon, loading, className }: StatCardProps) {
  return (
    <Card className={cn("relative overflow-hidden border-border/70 shadow-elegant", className)}>
      <CardContent className="p-5">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
              {label}
            </p>
            {loading ? (
              <Skeleton className="mt-3 h-8 w-24" />
            ) : (
              <p className="mt-2 font-display text-2xl font-bold tracking-tight">{value}</p>
            )}
            {delta && !loading && (
              <p
                className={cn(
                  "mt-1.5 text-xs font-medium",
                  delta.positive ? "text-success" : "text-destructive",
                )}
              >
                {delta.positive ? "▲" : "▼"} {delta.value}
              </p>
            )}
          </div>
          <div className="grid h-10 w-10 shrink-0 place-items-center rounded-lg bg-aurora-soft">
            <Icon className="h-4 w-4 text-aurora-violet" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
