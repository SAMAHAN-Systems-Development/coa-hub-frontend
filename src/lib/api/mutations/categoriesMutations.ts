import { useMutation, useQueryClient } from "@tanstack/react-query";
import { categoriesApi } from "../services/categoriesApi";
import {
  CreateCategoryRequest,
  UpdateCategoryRequest,
} from "@/lib/types/requests/category";
import { toast } from "sonner";

export const useCreateCategoryMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateCategoryRequest) => categoriesApi.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["categories"] });
      queryClient.invalidateQueries({ queryKey: ["members", "grouped"] });
      toast.success("Category created successfully");
    },
    onError: (error: Error) => {
      toast.error(error?.message || "Failed to create category");
    },
  });
};

export const useUpdateCategoryMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateCategoryRequest }) =>
      categoriesApi.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["categories"] });
      queryClient.invalidateQueries({ queryKey: ["members", "grouped"] });
      toast.success("Category updated successfully");
    },
    onError: (error: Error) => {
      toast.error(error?.message || "Failed to update category");
    },
  });
};

export const useDeleteCategoryMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => categoriesApi.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["categories"] });
      queryClient.invalidateQueries({ queryKey: ["members", "grouped"] });
      toast.success("Category deleted successfully");
    },
    onError: (error: Error) => {
      toast.error(error?.message || "Failed to delete category");
    },
  });
};
