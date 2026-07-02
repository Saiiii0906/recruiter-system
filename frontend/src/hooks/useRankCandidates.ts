import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { rankingService } from "@/services/ranking.service";
import type { ApiErrorShape } from "@/services/api";

export function useRankCandidates() {
  return useMutation({
    mutationFn: (jobDescription: string) => rankingService.rank(jobDescription),
    onSuccess: (data) => {
      toast.success("Ranking completed", {
        description: `${data.length} candidate${data.length === 1 ? "" : "s"} analyzed.`,
      });
    },
    onError: (err: ApiErrorShape) => {
      toast.error("Ranking failed", { description: err.message });
    },
  });
}
