import { api } from "./apiClient";
import { SubmissionBin, CreateSubmissionBinDto, UpdateSubmissionBinDto } from "@/lib/types/entities/submission-bin";

export const submissionBinsService = {
  getAll: () => api.get<SubmissionBin[]>('/submission-bins'),

  getById: (id: number) => api.get<SubmissionBin>(`/submission-bins/${id}`),

  create: (dto: CreateSubmissionBinDto) => api.post<SubmissionBin>('/submission-bins', dto),
  
  update: (id: number, dto: UpdateSubmissionBinDto) =>
    api.patch<SubmissionBin>(`/submission-bins/${id}`, dto),

  delete: (id: number) => api.delete<string>(`/submission-bins/${id}`),
};