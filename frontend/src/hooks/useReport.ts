import { useQuery } from "@tanstack/react-query";
import { reportService } from "@/services/report.service";

export function useReport(candidateId: string) {
  return useQuery({
    queryKey: ["report", candidateId],
    queryFn: () => reportService.getById(candidateId),
    enabled: !!candidateId,
    staleTime: 5 * 60 * 1000,
    retry: 1,
  });
}