import { z } from "zod";

export const blogFormSchema = z.object({
  title: z.string().min(1, "Title is required"),
  excerpt: z.string().min(1, "Excerpt is required"),
  content: z.string().min(1, "Content is required"),
  coverImage: z.string().url("Please enter a valid image URL"),
  category: z.string().min(1, "Category is required"),
  tags: z.array(z.string()).default([]),
});

export type BlogFormValues = z.infer<typeof blogFormSchema>;