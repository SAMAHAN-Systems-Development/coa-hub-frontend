import { useQuery } from "@tanstack/react-query";
import { deadlinesService } from "../services/deadlines.services";

export function useDeadlinesQuery() {
  return useQuery({
    queryKey: ["deadlines"],
    queryFn: deadlinesService.getAll,
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
}

export function useDeadlineQuery(id: number) {
  return useQuery({
    queryKey: ["deadlines", id],
    queryFn: () => deadlinesService.getById(id),
    staleTime: 1000 * 60 * 5, // 5 minutes
    enabled: !!id,
  });
}