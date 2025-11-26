import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deadlinesService } from "../services/deadlines.services";
import { CreateDeadlineDto, UpdateDeadlineDto } from "@/lib/types/entities/deadline";

export function useCreateDeadlineMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (dto: CreateDeadlineDto) => deadlinesService.create(dto),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["deadlines"] });
    },
  });
}

export function useUpdateDeadlineMutation(id: number) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, dto }: { id: number; dto: UpdateDeadlineDto }) =>
      deadlinesService.update(id, dto),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["deadlines"] });
      queryClient.invalidateQueries({ queryKey: ["deadlines", id] });
    },
  });
}

export function useDeleteDeadlineMutation(id: number) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => deadlinesService.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["deadlines"] });
      queryClient.invalidateQueries({ queryKey: ["deadlines", id] });
    },
  });
}