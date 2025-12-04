import { useMutation, useQueryClient } from "@tanstack/react-query";
import { submissionBinsService } from "../services/submission-bins.services";
import { CreateSubmissionBinDto, UpdateSubmissionBinDto } from "@/lib/types/entities/submission-bin";

export function useCreateSubmissionBinMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (dto: CreateSubmissionBinDto) => submissionBinsService.create(dto),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["submission-bins"] });
    },
  });
}

export function useUpdateSubmissionBinMutation(id: number) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, dto }: { id: number; dto: UpdateSubmissionBinDto }) =>
      submissionBinsService.update(id, dto),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["submission-bins"] });
      queryClient.invalidateQueries({ queryKey: ["submission-bins", id] });
    },
  });
}

export function useDeleteSubmissionBinMutation(id: number) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => submissionBinsService.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["submission-bins"] });
      queryClient.invalidateQueries({ queryKey: ["submission-bins", id] });
    },
  });
}