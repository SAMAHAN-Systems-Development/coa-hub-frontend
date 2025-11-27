import { api } from "./apiClient";
import { Template, CreateTemplateDto, UpdateTemplateDto } from "@/lib/types/entities/templates";

export const templatesService = {
  getAll: () => api.get<Template[]>('/templates'),

  getById: (id: number) => api.get<Template>(`/templates/${id}`),

  create: (dto: CreateTemplateDto) => api.post<Template>('/templates', dto),

  update: (id: number, dto: UpdateTemplateDto) =>
    api.patch<Template>(`/templates/${id}`, dto),

  delete: (id: number) => api.delete<string>(`/templates/${id}`),
};