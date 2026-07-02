import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

export function ScoreBadge({ value, className }: { value?: number; className?: string }) {
  if (value === undefined || value === null || Number.isNaN(value)) {
    return <span className="text-xs text-muted-foreground">—</span>;
  }
  const n = value > 1 ? value : value * 100;
  const tone =
    n >= 80
      ? "bg-success/15 text-success border-success/30"
      : n >= 60
        ? "bg-aurora-soft text-aurora-violet border-transparent"
        : n >= 40
          ? "bg-amber-500/15 text-amber-600 border-amber-500/30 dark:text-amber-400"
          : "bg-destructive/10 text-destructive border-destructive/30";
  return (
    <Badge variant="outline" className={cn("font-mono text-[11px]", tone, className)}>
      {n.toFixed(1)}
    </Badge>
  );
}
