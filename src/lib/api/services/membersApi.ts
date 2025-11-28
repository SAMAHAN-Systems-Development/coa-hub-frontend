import { api } from "./apiClient";
import { Member, PaginatedResponse } from "@/lib/types/entities/member";
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
    if (params?.categoryId) queryParams.append("categoryId", params.categoryId);
    if (params?.year) queryParams.append("year", params.year.toString());

    const queryString = queryParams.toString();
    return api.get<PaginatedResponse<Member>>(
      `/members${queryString ? `?${queryString}` : ""}`
    );
  },

  getById: (id: string) => api.get<Member>(`/members/${id}`),

  create: (data: CreateMemberRequest) => api.post<Member>("/members", data),

  update: (id: string, data: UpdateMemberRequest) =>
    api.patch<Member>(`/members/${id}`, data),

  delete: (id: string) => api.delete<void>(`/members/${id}`),
};
