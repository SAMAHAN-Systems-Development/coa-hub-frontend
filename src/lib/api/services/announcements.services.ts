import { api } from "./apiClient";
import {
  Announcement,
  CreateAnnouncementDto,
  UpdateAnnouncementDto,
  AnnouncementQueryParams,
} from "@/lib/types/entities/announcement";

export const announcementsService = {
  getAll: (params?: AnnouncementQueryParams) => {
    const searchParams = new URLSearchParams();
    if (params?.page) searchParams.set("page", String(params.page));
    if (params?.limit) searchParams.set("limit", String(params.limit));
    const query = searchParams.toString();
    return api.get<Announcement[]>(`/announcements${query ? `?${query}` : ""}`);
  },

  getById: (id: number) => api.get<Announcement>(`/announcements/${id}`),

  create: (dto: CreateAnnouncementDto) =>
    api.post<Announcement>("/announcements", dto),

  update: (id: number, dto: UpdateAnnouncementDto) =>
    api.patch<Announcement>(`/announcements/${id}`, dto),

  delete: (id: number) => api.delete<{ message: string }>(`/announcements/${id}`),
};
