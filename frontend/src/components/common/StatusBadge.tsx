import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import type { CandidateStatus } from "@/types";

const TONES: Record<CandidateStatus, string> = {
  available: "bg-success/12 text-success border-success/30",
  interviewing: "bg-aurora-soft text-aurora-violet border-transparent",
  shortlisted: "bg-amber-500/15 text-amber-600 dark:text-amber-400 border-amber-500/30",
  rejected: "bg-destructive/10 text-destructive border-destructive/30",
  hired: "bg-blue-500/15 text-blue-600 dark:text-blue-400 border-blue-500/30",
};

const LABELS: Record<CandidateStatus, string> = {
  available: "Available",
  interviewing: "Interviewing",
  shortlisted: "Shortlisted",
  rejected: "Rejected",
  hired: "Hired",
};

export function StatusBadge({ status, className }: { status: CandidateStatus; className?: string }) {
  return (
    <Badge variant="outline" className={cn("text-[11px] font-medium", TONES[status], className)}>
      <span className="mr-1 inline-block h-1.5 w-1.5 rounded-full bg-current" />
      {LABELS[status]}
    </Badge>
  );
}

const REC_TONES = {
  strong_match: "bg-success/12 text-success border-success/30",
  good_fit: "bg-aurora-soft text-aurora-violet border-transparent",
  consider: "bg-amber-500/15 text-amber-600 dark:text-amber-400 border-amber-500/30",
  not_aligned: "bg-muted text-muted-foreground border-border",
} as const;

const REC_LABELS = {
  strong_match: "Strong match",
  good_fit: "Good fit",
  consider: "Consider",
  not_aligned: "Not aligned",
} as const;

export function RecommendationBadge({
  value,
  className,
}: {
  value: keyof typeof REC_LABELS;
  className?: string;
}) {
  return (
    <Badge variant="outline" className={cn("text-[11px] font-medium", REC_TONES[value], className)}>
      {REC_LABELS[value]}
    </Badge>
  );
}
