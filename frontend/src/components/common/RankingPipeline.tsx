import { useEffect, useState } from "react";
import { Check, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

const STAGES = [
  "Reading job description",
  "Extracting required skills",
  "Building embeddings",
  "Semantic matching",
  "Ranking candidates",
  "Generating explanations",
] as const;

interface Props {
  onComplete?: () => void;
  durationMs?: number;
}

export function RankingPipeline({ onComplete, durationMs = 3600 }: Props) {
  const [active, setActive] = useState(0);
  const step = durationMs / STAGES.length;

  useEffect(() => {
    if (active >= STAGES.length) {
      onComplete?.();
      return;
    }
    const t = setTimeout(() => setActive((a) => a + 1), step);
    return () => clearTimeout(t);
  }, [active, step, onComplete]);

  const progress = Math.min(100, (active / STAGES.length) * 100);

  return (
    <div className="rounded-2xl border border-border bg-card p-6 shadow-elegant md:p-8">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-widest text-aurora">
            Aurora AI
          </p>
          <h3 className="mt-1 font-display text-lg font-semibold tracking-tight">
            Running ranking pipeline
          </h3>
          <p className="mt-1 text-sm text-muted-foreground">
            Analyzing your candidate pool against the job description.
          </p>
        </div>
        <div className="hidden font-mono text-xs text-muted-foreground md:block">
          {Math.min(active, STAGES.length)} / {STAGES.length}
        </div>
      </div>

      <div className="mt-5 h-1.5 w-full overflow-hidden rounded-full bg-muted">
        <div
          className="h-full bg-aurora transition-all duration-500 ease-out"
          style={{ width: `${progress}%` }}
        />
      </div>

      <ol className="mt-6 space-y-3">
        {STAGES.map((stage, i) => {
          const done = i < active;
          const current = i === active;
          return (
            <li
              key={stage}
              className={cn(
                "flex items-center gap-3 rounded-lg border px-3 py-2.5 transition-colors",
                done
                  ? "border-success/30 bg-success/5"
                  : current
                    ? "border-aurora-violet/30 bg-aurora-soft"
                    : "border-border bg-surface",
              )}
            >
              <div
                className={cn(
                  "grid h-7 w-7 place-items-center rounded-full",
                  done
                    ? "bg-success text-success-foreground"
                    : current
                      ? "bg-aurora text-primary-foreground"
                      : "bg-muted text-muted-foreground",
                )}
              >
                {done ? (
                  <Check className="h-3.5 w-3.5" />
                ) : current ? (
                  <Loader2 className="h-3.5 w-3.5 animate-spin" />
                ) : (
                  <span className="text-[11px] font-semibold">{i + 1}</span>
                )}
              </div>
              <span
                className={cn(
                  "text-sm",
                  done
                    ? "text-foreground"
                    : current
                      ? "font-medium text-foreground"
                      : "text-muted-foreground",
                )}
              >
                {stage}
              </span>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
