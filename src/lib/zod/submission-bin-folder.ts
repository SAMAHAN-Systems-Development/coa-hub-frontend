import { z } from "zod";

export const SubmissionBinFolderSchema = z.object({
    id: z.string(),
    binId: z.number(),
    folderName: z.string(),
    gdriveLink: z.string().url().refine((val) => {
        try {
            const url = new URL(val);
            // Ensure the hostname is drive.google.com and the path points to a folder
            return (
                url.hostname === "drive.google.com" &&
                url.pathname.startsWith("/drive/folders/")
            );
        } catch (e) {
            return false;
        }
    }, {
        message: "Only Google Drive folder links are allowed (e.g. https://drive.google.com/drive/folders/<id>)",
    }),
});

export const SubmissionBinFoldersSchema = z.array(SubmissionBinFolderSchema);

export type SubmissionBinFolder = z.infer<typeof SubmissionBinFolderSchema>;