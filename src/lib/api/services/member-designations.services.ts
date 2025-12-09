import { api } from "./apiClient";
import type { MemberDesignation } from "@/lib/types/entities/member-designation";

export const memberDesignationsService = {
  getAll: (binId?: number) => {
    let url = "/member-designations";
    if (binId) {
      url += `?binId=${binId}`;
    }
    return api.get<MemberDesignation[]>(url);
  },

  create: (dto: { memberId: number; binId: number }) => {
    return api.post<MemberDesignation>("/member-designations", dto);
  },

  remove: (id: number) => {
    return api.delete(`/member-designations/${id}`);
  },
};
