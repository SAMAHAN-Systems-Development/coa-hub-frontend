import { api } from "./apiClient";
import { Deadline, CreateDeadlineDto, UpdateDeadlineDto } from "@/lib/types/entities/deadline";

export const deadlinesService = {
  getAll: () => api.get<Deadline[]>('/deadlines'),

  getById: (id: number) => api.get<Deadline>(`/deadlines/${id}`),

  create: (dto: CreateDeadlineDto) => api.post<Deadline>('/deadlines', dto),

  update: (id: number, dto: UpdateDeadlineDto) =>
    api.patch<Deadline>(`/deadlines/${id}`, dto),

  delete: (id: number) => api.delete<string>(`/deadlines/${id}`),
};