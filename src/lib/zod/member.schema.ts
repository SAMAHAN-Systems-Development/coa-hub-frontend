import { z } from "zod";

export const memberSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  position: z.string().min(1, "Position is required"),
  email: z.string().email("Invalid email address").min(1, "Email is required"),
  image: z.instanceof(File).optional(),
});

export const editMemberSchema = z.object({
  fullName: z.string().min(1, "Full name is required"),
  position: z.string().min(1, "Position is required"),
  email: z.string().email("Invalid email address").min(1, "Email is required"),
  image: z.instanceof(File).optional(),
});

export const createMemberSchema = z.object({
  firstName: z
    .string()
    .min(1, "First name is required")
    .max(50, "First name is too long"),
  lastName: z
    .string()
    .min(1, "Last name is required")
    .max(50, "Last name is too long"),
  email: z.string().email("Invalid email address").min(1, "Email is required"),
  categoryId: z.string().min(1, "Category is required"),
  year: z
    .number()
    .int()
    .min(2000, "Year must be 2000 or later")
    .max(2100, "Invalid year"),
  imageUrl: z.string().url("Invalid image URL").optional().or(z.literal("")),
});

export const updateMemberSchema = z.object({
  firstName: z
    .string()
    .min(1, "First name is required")
    .max(50, "First name is too long")
    .optional(),
  lastName: z
    .string()
    .min(1, "Last name is required")
    .max(50, "Last name is too long")
    .optional(),
  email: z.string().email("Invalid email address").optional(),
  categoryId: z.string().min(1, "Category is required").optional(),
  year: z
    .number()
    .int()
    .min(2000, "Year must be 2000 or later")
    .max(2100, "Invalid year")
    .optional(),
  imageUrl: z.string().url("Invalid image URL").optional().or(z.literal("")),
});

export type MemberFormData = z.infer<typeof memberSchema>;
export type EditMemberFormData = z.infer<typeof editMemberSchema>;
export type CreateMemberFormData = z.infer<typeof createMemberSchema>;
export type UpdateMemberFormData = z.infer<typeof updateMemberSchema>;
