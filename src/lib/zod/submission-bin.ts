import { z } from "zod";

export const SubmissionBinSchema = z.object({
    id: z.string(),
    name: z.string(),
    fileFormat: z.string(),
    fileName: z.string(),
});

export const SubmissionBinsSchema = z.array(SubmissionBinSchema);

export type SubmissionBin = z.infer<typeof SubmissionBinSchema>;
