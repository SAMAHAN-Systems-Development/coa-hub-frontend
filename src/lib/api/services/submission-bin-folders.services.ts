import { api } from "./apiClient";
import { SubmissionBinFolder, CreateSubmissionBinFolderDto, UpdateSubmissionBinFolderDto } from "@/lib/types/entities/submission-bin-folder";

export const submissionBinFoldersService = {
  getAll: async () => {
    try {
      return await api.get<SubmissionBinFolder[]>('/submission-bin-folders');
    } catch (err) {
      console.error('submissionBinFoldersService.getAll failed', err);
      throw err;
    }
  },

  getById: async (id: number) => {
    try {
      return await api.get<SubmissionBinFolder>(`/submission-bin-folders/${id}`);
    } catch (err) {
      console.error(`submissionBinFoldersService.getById(${id}) failed`, err);
      throw err;
    }
  },

  create: async (dto: CreateSubmissionBinFolderDto) => {
    try {
      return await api.post<SubmissionBinFolder>('/submission-bin-folders', dto);
    } catch (err) {
      console.error('submissionBinFoldersService.create failed', err);
      throw err;
    }
  },
  
  update: async (id: number, dto: UpdateSubmissionBinFolderDto) => {
    try {
      return await api.patch<SubmissionBinFolder>(`/submission-bin-folders/${id}`, dto);
    } catch (err) {
      console.error(`submissionBinFoldersService.update(${id}) failed`, err);
      throw err;
    }
  },

  delete: async (id: number) => {
    try {
      return await api.delete<string>(`/submission-bin-folders/${id}`);
    } catch (err) {
      console.error(`submissionBinFoldersService.delete(${id}) failed`, err);
      throw err;
    }
  },
};