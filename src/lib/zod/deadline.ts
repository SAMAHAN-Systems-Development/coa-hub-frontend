import { z } from "zod";

export const DeadlineSchema = z.object({
  id: z.string(),
  title: z.string(),
  dueDate: z.string(),
});

export const DeadlinesSchema = z.array(DeadlineSchema);

export type Deadline = z.infer<typeof DeadlineSchema>;
