import { useQuery } from "@tanstack/react-query";
import { candidateService } from "@/services/candidate.service";

export function useCandidate(id: string | undefined) {
  return useQuery({
    queryKey: ["candidate", id],
    queryFn: () => candidateService.getById(id!),
    enabled: !!id,
  });
}
