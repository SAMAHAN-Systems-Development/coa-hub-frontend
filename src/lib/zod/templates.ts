import { z } from "zod";

export const TemplateSchema = z.object({
    id: z.coerce.string(),
    name: z.string(),
    gdriveLink: z.string().url().refine((val) => {
        try {
            const url = new URL(val);
            const cleanLink = val.split("?")[0];

            // 1️⃣ GOOGLE DOCS (document/d/... or document/u/.../d/...)
            if (cleanLink.includes("docs.google.com/document")) {
                return cleanLink.match(/\/d\/([^/]+)/) !== null;
            }

            // 2️⃣ GOOGLE FILE (PDF, DOCX, TEXT, SLIDES, IMAGES, ANY FILE)
            // Format: https://drive.google.com/file/d/{ID}/view
            if (cleanLink.includes("drive.google.com/file")) {
                return cleanLink.match(/\/d\/([^/]+)/) !== null;
            }

            // 3️⃣ GOOGLE DRIVE FOLDER  
            // Format: https://drive.google.com/drive/folders/{ID}
            if (cleanLink.includes("drive.google.com/drive/folders")) {
                return cleanLink.match(/\/folders\/([^/]+)/) !== null;
            }

            // 4️⃣ ALTERNATE DOCS FORMAT (export/... etc)
            if (cleanLink.includes("document/d/")) {
                return cleanLink.match(/document\/d\/([^/]+)/) !== null;
            }

            return false;
        } catch (e) {
            return false;
        }
    }, {
        message: "Only Google Drive links are allowed: Google Docs, Files (PDF/DOCX/etc), Folders, or Alternate Docs format",
    }),
});

export const TemplatesSchema = z.array(TemplateSchema);

export type Template = z.infer<typeof TemplateSchema>;
