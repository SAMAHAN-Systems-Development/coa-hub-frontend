import { useQuery } from "@tanstack/react-query";
import { templatesService } from "../services/templates.services";

export function useTemplatesQuery() {
  return useQuery({
    queryKey: ["templates"],
    queryFn: templatesService.getAll,
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
}

export function useTemplateQuery(id: number) {
  return useQuery({
    queryKey: ["templates", id],
    queryFn: () => templatesService.getById(id),
    staleTime: 1000 * 60 * 5, // 5 minutes
    enabled: !!id,
  });
}