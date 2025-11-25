import { DeadlinesSchema } from "@/lib/zod/deadline";

export async function getDeadlinesService() {
  const res = await fetch("/api/deadlines");

  if (!res.ok) {
    throw new Error("Failed to fetch deadlines");
  }

  const json = await res.json();
  return DeadlinesSchema.parse(json);
}
