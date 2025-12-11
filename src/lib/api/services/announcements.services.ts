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

  getRecent: (days: number = 7) =>
    api.get<Announcement[]>(`/announcements/recent?days=${days}`),

  /** Create announcement without images (JSON) */
  create: (dto: CreateAnnouncementDto) =>
    api.post<Announcement>("/announcements", dto),

  /** Create announcement with images (FormData) */
  createWithImages: (data: { title: string; description: string; images?: File[] }) => {
    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("description", data.description);
    if (data.images) {
      data.images.forEach((file) => {
        formData.append("images", file);
      });
    }
    return api.upload<Announcement>("/announcements", formData);
  },

  /** Update announcement without images (JSON) */
  update: (id: number, dto: UpdateAnnouncementDto) =>
    api.patch<Announcement>(`/announcements/${id}`, dto),

  /** Update announcement with images (FormData) */
  updateWithImages: (id: number, data: { title?: string; description?: string; images?: File[] }) => {
    const formData = new FormData();
    if (data.title) formData.append("title", data.title);
    if (data.description) formData.append("description", data.description);
    if (data.images) {
      data.images.forEach((file) => {
        formData.append("images", file);
      });
    }
    return api.uploadPatch<Announcement>(`/announcements/${id}`, formData);
  },

  delete: (id: number) => api.delete<{ message: string }>(`/announcements/${id}`),
};
