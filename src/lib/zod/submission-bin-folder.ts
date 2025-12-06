import { z } from "zod";

export const SubmissionBinFolderSchema = z.object({
    id: z.string(),
    binId: z.number(),
    folderName: z.string(),
    gdriveLink: z.string().url(),
});

export const SubmissionBinFoldersSchema = z.array(SubmissionBinFolderSchema);

export type SubmissionBinFolder = z.infer<typeof SubmissionBinFolderSchema>;