import { z } from "zod";

export const TemplateSchema = z.object({
    id: z.string(),
    name: z.string(),
    gdriveLink: z.string().url(),
});

export const TemplatesSchema = z.array(TemplateSchema);

export type Template = z.infer<typeof TemplateSchema>;
