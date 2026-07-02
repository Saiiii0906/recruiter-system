import { type LucideIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface EmptyStateProps {
  icon: LucideIcon;
  title: string;
  description?: string;
  action?: { label: string; onClick?: () => void } | React.ReactNode;
  className?: string;
}

export function EmptyState({
  icon: Icon,
  title,
  description,
  action,
  className,
}: EmptyStateProps) {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center rounded-xl border border-dashed border-border bg-surface px-6 py-14 text-center",
        className,
      )}
    >
      <div className="grid h-12 w-12 place-items-center rounded-xl bg-aurora-soft">
        <Icon className="h-5 w-5 text-aurora-violet" />
      </div>
      <h3 className="mt-4 font-display text-base font-semibold">{title}</h3>
      {description && (
        <p className="mt-1.5 max-w-sm text-sm text-muted-foreground">{description}</p>
      )}
      {action &&
        (typeof action === "object" && action !== null && "label" in (action as object) ? (
          <Button
            onClick={(action as { label: string; onClick?: () => void }).onClick}
            className="mt-5 bg-aurora text-primary-foreground hover:opacity-90"
          >
            {(action as { label: string }).label}
          </Button>
        ) : (
          <div className="mt-5">{action as React.ReactNode}</div>
        ))}
    </div>
  );
}
