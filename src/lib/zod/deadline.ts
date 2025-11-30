import { z } from "zod";

export const DeadlineSchema = z.object({
  id: z.string(),
  name: z.string(),
  dueDate: z
    .string()
    .refine((value) => {
      const today = new Date();
      today.setHours(0, 0, 0, 0); // normalize to midnight

      const date = new Date(value);
      return date >= today;
    }, "Due date cannot be in the past"),
});

export const DeadlinesSchema = z.array(DeadlineSchema);

export type Deadline = z.infer<typeof DeadlineSchema>;
