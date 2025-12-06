import { useQuery } from "@tanstack/react-query";
import { submissionBinFoldersService } from "../services/submission-bin-folders.services";

export function useSubmissionBinFoldersQuery() {
  return useQuery({
    queryKey: ["submission-bin-folders"],
    queryFn: submissionBinFoldersService.getAll,
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
}

export function useSubmissionBinFolderQuery(id: number) {
  return useQuery({
    queryKey: ["submission-bin-folders", id],
    queryFn: () => submissionBinFoldersService.getById(id),
    staleTime: 1000 * 60 * 5, // 5 minutes
    enabled: !!id,
  });
}