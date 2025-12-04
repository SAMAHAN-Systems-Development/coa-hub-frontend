import { useQuery } from "@tanstack/react-query";
import { submissionBinsService } from "../services/submission-bins.services";

export function useSubmissionBinsQuery() {
  return useQuery({
    queryKey: ["submission-bins"],
    queryFn: submissionBinsService.getAll,
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
}

export function useSubmissionBinQuery(id: number) {
  return useQuery({
    queryKey: ["submission-bins", id],
    queryFn: () => submissionBinsService.getById(id),
    staleTime: 1000 * 60 * 5, // 5 minutes
    enabled: !!id,
  });
}