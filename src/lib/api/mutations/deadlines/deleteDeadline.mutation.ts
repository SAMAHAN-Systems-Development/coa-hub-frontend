import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useDeleteDeadlineMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      const res = await fetch(`/api/deadlines/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Failed to delete deadline");
      return true;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["deadlines"] });
    },
  });
}
