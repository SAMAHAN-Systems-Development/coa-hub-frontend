import { useMutation, useQueryClient } from "@tanstack/react-query";
import { announcementsService } from "../services/announcements.services";
import {
  CreateAnnouncementDto,
  UpdateAnnouncementDto,
} from "@/lib/types/entities/announcement";

export function useCreateAnnouncementMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (dto: CreateAnnouncementDto) => announcementsService.create(dto),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["announcements"] });
    },
  });
}

/** Create announcement with image uploads */
export function useCreateAnnouncementWithImagesMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: { title: string; description: string; images?: File[] }) =>
      announcementsService.createWithImages(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["announcements"] });
    },
  });
}

export function useUpdateAnnouncementMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, dto }: { id: number; dto: UpdateAnnouncementDto }) =>
      announcementsService.update(id, dto),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ["announcements"] });
      queryClient.invalidateQueries({ queryKey: ["announcements", variables.id] });
    },
  });
}

/** Update announcement with image uploads */
export function useUpdateAnnouncementWithImagesMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: { title?: string; description?: string; images?: File[] } }) =>
      announcementsService.updateWithImages(id, data),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ["announcements"] });
      queryClient.invalidateQueries({ queryKey: ["announcements", variables.id] });
    },
  });
}

export function useDeleteAnnouncementMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => announcementsService.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["announcements"] });
    },
  });
}
