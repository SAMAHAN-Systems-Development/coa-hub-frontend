import { api } from "./apiClient";
import { MemberCategory } from "@/lib/types/entities/member";
import {
  CreateCategoryRequest,
  UpdateCategoryRequest,
} from "@/lib/types/requests/category";

export const categoriesApi = {
  getAll: () => api.get<MemberCategory[]>("/member-categories"),

  getById: (id: string) => api.get<MemberCategory>(`/member-categories/${id}`),

  create: (data: CreateCategoryRequest) =>
    api.post<MemberCategory>("/member-categories", data),

  update: (id: string, data: UpdateCategoryRequest) =>
    api.patch<MemberCategory>(`/member-categories/${id}`, data),

  delete: (id: string) => api.delete<void>(`/member-categories/${id}`),
};
