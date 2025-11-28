import { useQuery } from "@tanstack/react-query";
import { membersApi } from "../services/membersApi";
import { GetMembersRequest } from "@/lib/types/requests/member";

export function useMembersQuery(params?: GetMembersRequest) {
  return useQuery({
    queryKey: ["members", params],
    queryFn: () => membersApi.getAll(params),
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
}

export function useMemberQuery(id: string) {
  return useQuery({
    queryKey: ["members", id],
    queryFn: () => membersApi.getById(id),
    staleTime: 1000 * 60 * 5, // 5 minutes
    enabled: !!id,
  });
}
