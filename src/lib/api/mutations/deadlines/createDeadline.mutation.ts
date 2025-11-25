import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useCreateDeadlineMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (payload: { title: string; dueDate: string }) => {
      const res = await fetch("/api/deadlines", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error("Failed to create deadline");
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["deadlines"] });
    },
  });
}
