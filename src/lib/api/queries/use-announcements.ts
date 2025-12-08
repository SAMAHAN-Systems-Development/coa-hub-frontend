import { useQuery } from "@tanstack/react-query";
import { announcementsService } from "../services/announcements.services";
import { AnnouncementQueryParams } from "@/lib/types/entities/announcement";

export function useAnnouncementsQuery(params?: AnnouncementQueryParams) {
  return useQuery({
    queryKey: ["announcements", params],
    queryFn: () => announcementsService.getAll(params),
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
}

export function useAnnouncementQuery(
  id: number,
  options?: { enabled?: boolean }
) {
  return useQuery({
    queryKey: ["announcements", id],
    queryFn: () => announcementsService.getById(id),
    staleTime: 1000 * 60 * 5, // 5 minutes
    enabled: options?.enabled ?? !!id,
  });
}
