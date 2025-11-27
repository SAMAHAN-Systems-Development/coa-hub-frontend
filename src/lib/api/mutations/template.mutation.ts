import { useMutation, useQueryClient } from "@tanstack/react-query";
import { templatesService } from "../services/templates.services";
import { CreateTemplateDto, UpdateTemplateDto } from "@/lib/types/entities/templates";

export function useCreateTemplateMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (dto: CreateTemplateDto) => templatesService.create(dto),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["templates"] });
    },
  });
}

export function useUpdateTemplateMutation(id: number) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, dto }: { id: number; dto: UpdateTemplateDto }) =>
      templatesService.update(id, dto),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["templates"] });
      queryClient.invalidateQueries({ queryKey: ["templates", id] });
    },
  });
}

export function useDeleteTemplateMutation(id: number) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => templatesService.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["templates"] });
      queryClient.invalidateQueries({ queryKey: ["templates", id] });
    },
  });
}