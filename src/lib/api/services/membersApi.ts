import { api } from "./apiClient";
import {
  Member,
  PaginatedResponse,
  CategoryWithMembers,
} from "@/lib/types/entities/member";
import {
  CreateMemberRequest,
  UpdateMemberRequest,
  GetMembersRequest,
} from "@/lib/types/requests/member";

export const membersApi = {
  getAll: (params?: GetMembersRequest) => {
    const queryParams = new URLSearchParams();
    if (params?.page) queryParams.append("page", params.page.toString());
    if (params?.limit) queryParams.append("limit", params.limit.toString());
    if (params?.search) queryParams.append("search", params.search);
    if (params?.categoryId)
      queryParams.append("categoryId", params.categoryId.toString());

    const queryString = queryParams.toString();
    return api.get<PaginatedResponse<Member>>(
      `/members${queryString ? `?${queryString}` : ""}`
    );
  },

  getById: (id: string) => api.get<Member>(`/members/${id}`),

  getGrouped: () => api.get<CategoryWithMembers[]>("/members/grouped"),

  /** Create member without image (JSON) */
  create: (data: CreateMemberRequest) => api.post<Member>("/members", data),

  /** Create member with image (FormData) */
  createWithImage: (data: { name: string; position: string; email: string; categoryId: number; image?: File }) => {
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("position", data.position);
    formData.append("email", data.email);
    formData.append("categoryId", String(data.categoryId));
    if (data.image) {
      formData.append("image", data.image);
    }
    return api.upload<Member>("/members", formData);
  },

  /** Update member without image (JSON) */
  update: (id: string, data: UpdateMemberRequest) =>
    api.patch<Member>(`/members/${id}`, data),

  /** Update member with image (FormData) */
  updateWithImage: (id: string, data: { name?: string; position?: string; email?: string; categoryId?: number; image?: File }) => {
    const formData = new FormData();
    if (data.name) formData.append("name", data.name);
    if (data.position) formData.append("position", data.position);
    if (data.email) formData.append("email", data.email);
    if (data.categoryId) formData.append("categoryId", String(data.categoryId));
    if (data.image) {
      formData.append("image", data.image);
    }
    return api.uploadPatch<Member>(`/members/${id}`, formData);
  },

  delete: (id: string) => api.delete<void>(`/members/${id}`),
};
