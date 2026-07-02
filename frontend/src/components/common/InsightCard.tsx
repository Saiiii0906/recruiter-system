import { ArrowDownRight, ArrowUpRight, Minus, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";
import type { InsightItem } from "@/data/mockAnalytics";

const TONE: Record<InsightItem["category"], string> = {
  trend: "bg-aurora-soft text-aurora-violet",
  skill: "bg-amber-500/10 text-amber-600 dark:text-amber-400",
  location: "bg-cyan-500/10 text-cyan-600 dark:text-cyan-400",
  tech: "bg-violet-500/10 text-violet-600 dark:text-violet-300",
  growth: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400",
};

export function InsightCard({ insight }: { insight: InsightItem }) {
  const TrendIcon =
    insight.trend === "up" ? ArrowUpRight : insight.trend === "down" ? ArrowDownRight : Minus;
  const trendColor =
    insight.trend === "up"
      ? "text-success"
      : insight.trend === "down"
        ? "text-destructive"
        : "text-muted-foreground";

  return (
    <div className="group relative overflow-hidden rounded-xl border border-border bg-card p-4 shadow-elegant transition-all hover:border-aurora-violet/40">
      <div className="flex items-start justify-between gap-3">
        <div className={cn("grid h-8 w-8 place-items-center rounded-lg", TONE[insight.category])}>
          <Sparkles className="h-4 w-4" />
        </div>
        <div className={cn("inline-flex items-center gap-1 text-xs font-medium", trendColor)}>
          <TrendIcon className="h-3.5 w-3.5" />
          {insight.delta}
        </div>
      </div>
      <h4 className="mt-3 font-display text-sm font-semibold tracking-tight">{insight.title}</h4>
      <p className="mt-1.5 text-xs leading-relaxed text-muted-foreground">{insight.body}</p>
    </div>
  );
}
