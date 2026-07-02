import { cn } from "@/lib/utils";

interface Props {
  value: number;
  label?: string;
  size?: number;
  stroke?: number;
  tone?: "aurora" | "success" | "muted";
  className?: string;
}

export function ScoreRing({
  value,
  label,
  size = 96,
  stroke = 8,
  tone = "aurora",
  className,
}: Props) {
  const clamped = Math.max(0, Math.min(100, value));
  const r = (size - stroke) / 2;
  const c = 2 * Math.PI * r;
  const offset = c - (clamped / 100) * c;

  const gradId = `ring-grad-${tone}`;
  const stops =
    tone === "success"
      ? ["var(--success)", "var(--success)"]
      : tone === "muted"
        ? ["var(--muted-foreground)", "var(--muted-foreground)"]
        : ["var(--aurora-violet)", "var(--aurora-cyan)"];

  return (
    <div className={cn("relative inline-flex flex-col items-center", className)}>
      <svg width={size} height={size} className="-rotate-90">
        <defs>
          <linearGradient id={gradId} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={stops[0]} />
            <stop offset="100%" stopColor={stops[1]} />
          </linearGradient>
        </defs>
        <circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          fill="none"
          stroke="var(--border)"
          strokeWidth={stroke}
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          fill="none"
          stroke={`url(#${gradId})`}
          strokeWidth={stroke}
          strokeLinecap="round"
          strokeDasharray={c}
          strokeDashoffset={offset}
          style={{ transition: "stroke-dashoffset 700ms ease-out" }}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="font-display text-xl font-bold tracking-tight">
          {clamped.toFixed(0)}
          <span className="text-xs font-medium text-muted-foreground">%</span>
        </span>
        {label && (
          <span className="mt-0.5 text-[10px] font-medium uppercase tracking-wider text-muted-foreground">
            {label}
          </span>
        )}
      </div>
    </div>
  );
}
