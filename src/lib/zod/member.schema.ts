import { z } from "zod";

export const memberSchema = z.object({
  name: z.string().min(1, "Name is required").max(255, "Name is too long"),
  position: z
    .string()
    .min(1, "Position is required")
    .max(255, "Position is too long"),
  email: z
    .string()
    .email("Invalid email address")
    .min(1, "Email is required")
    .max(255, "Email is too long"),
  image: z.instanceof(File).optional(),
});

export const editMemberSchema = z.object({
  name: z.string().min(1, "Name is required").max(255, "Name is too long"),
  position: z
    .string()
    .min(1, "Position is required")
    .max(255, "Position is too long"),
  email: z
    .string()
    .email("Invalid email address")
    .min(1, "Email is required")
    .max(255, "Email is too long"),
  image: z.instanceof(File).optional(),
});

export const createMemberSchema = z.object({
  name: z.string().min(1, "Name is required").max(255, "Name is too long"),
  position: z
    .string()
    .min(1, "Position is required")
    .max(255, "Position is too long"),
  email: z
    .string()
    .email("Invalid email address")
    .min(1, "Email is required")
    .max(255, "Email is too long"),
  categoryId: z.number().int().positive("Category is required"),
  imageUrl: z
    .string()
    .url("Invalid image URL")
    .max(500, "URL is too long")
    .optional()
    .or(z.literal("")),
});

export const updateMemberSchema = z.object({
  name: z
    .string()
    .min(1, "Name is required")
    .max(255, "Name is too long")
    .optional(),
  position: z
    .string()
    .min(1, "Position is required")
    .max(255, "Position is too long")
    .optional(),
  email: z
    .string()
    .email("Invalid email address")
    .max(255, "Email is too long")
    .optional(),
  categoryId: z.number().int().positive("Category is required").optional(),
  imageUrl: z
    .string()
    .url("Invalid image URL")
    .max(500, "URL is too long")
    .optional()
    .or(z.literal("")),
});

export type MemberFormData = z.infer<typeof memberSchema>;
export type EditMemberFormData = z.infer<typeof editMemberSchema>;
export type CreateMemberFormData = z.infer<typeof createMemberSchema>;
export type UpdateMemberFormData = z.infer<typeof updateMemberSchema>;
