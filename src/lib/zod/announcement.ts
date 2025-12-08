import { z } from "zod";

export const AnnouncementFormSchema = z.object({
  subject: z
    .string()
    .min(3, "Subject is required")
    .max(100, "Subject too long"),
  body: z.string().min(10, "Body is required").max(2000, "Body too long"),
  images: z.array(z.instanceof(File)).max(5, "Max 5 images"),
});

export type AnnouncementFormData = z.infer<typeof AnnouncementFormSchema>;
