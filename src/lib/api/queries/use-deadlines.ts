import { useQuery } from "@tanstack/react-query";
import { getDeadlinesService } from "../services/deadlines.services";

export const DEADLINES_QUERY_KEY = ["deadlines"];

export function useDeadlinesQuery() {
  return useQuery({
    queryKey: DEADLINES_QUERY_KEY,
    queryFn: getDeadlinesService,
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
}
