import { useMutation, useQueryClient } from "@tanstack/react-query";
import { submissionBinFoldersService } from "../services/submission-bin-folders.services";
import { CreateSubmissionBinFolderDto, UpdateSubmissionBinFolderDto } from "@/lib/types/entities/submission-bin-folder";
import { toastError } from "@/components/shared/toast";

export function useCreateSubmissionBinFolderMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (dto: CreateSubmissionBinFolderDto) => submissionBinFoldersService.create(dto),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["submission-bin-folders"] });
    },
    onError: (err: any) => {
      console.error('Create submission bin folder failed (mutation)', err);
      const message = err?.message || 'Failed to create submission bin folder (network error).';
      toastError({ title: 'Create failed', description: String(message) });
    },
  });
}

export function useUpdateSubmissionBinFolderMutation(id: number) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, dto }: { id: number; dto: UpdateSubmissionBinFolderDto }) =>
      submissionBinFoldersService.update(id, dto),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["submission-bin-folders"] });
      queryClient.invalidateQueries({ queryKey: ["submission-bin-folders", id] });
    },
    onError: (err: any) => {
      console.error('Update submission bin folder failed (mutation)', err);
      const message = err?.message || 'Failed to update submission bin folder (network error).';
      toastError({ title: 'Update failed', description: String(message) });
    },
  });
}

export function useDeleteSubmissionBinFolderMutation(id: number) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => submissionBinFoldersService.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["submission-bin-folders"] });
      queryClient.invalidateQueries({ queryKey: ["submission-bin-folders", id] });
    },
    onError: (err: any) => {
      console.error('Delete submission bin folder failed (mutation)', err);
      const message = err?.message || 'Failed to delete submission bin folder (network error).';
      toastError({ title: 'Delete failed', description: String(message) });
    },
  });
}