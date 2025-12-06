import { useQuery } from "@tanstack/react-query";
import { categoriesApi } from "../services/categoriesApi";

export const useCategoriesQuery = () => {
  return useQuery({
    queryKey: ["categories"],
    queryFn: () => categoriesApi.getAll(),
  });
};

export const useCategoryByIdQuery = (id: string) => {
  return useQuery({
    queryKey: ["categories", id],
    queryFn: () => categoriesApi.getById(id),
    enabled: !!id,
  });
};
