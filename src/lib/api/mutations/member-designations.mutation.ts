import { useMutation, useQueryClient } from "@tanstack/react-query";
import { memberDesignationsService } from "../services/member-designations.services";
import { toastError } from "@/components/shared/toast";
import { ApiError } from "../services/apiClient";

export function useCreateMemberDesignationMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: memberDesignationsService.create,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["member-designations"] });
    },
    onError: (error: ApiError) => {
      const message = (error.data as any)?.message || "Something went wrong";
      toastError({
        title: "Failed to assign member",
        description: message,
      });
    },
  });
}

export function useDeleteMemberDesignationMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: memberDesignationsService.remove,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["member-designations"] });
    },
    onError: (error: ApiError) => {
      const message = (error.data as any)?.message || "Something went wrong";
      toastError({
        title: "Failed to remove member",
        description: message,
      });
    },
  });
}