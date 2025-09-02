import z from "zod";

export const profileSchema = z.object({
  firstName: z.string().min(2).max(100),
  lastName: z.string().min(2).max(100),
  age: z.number().min(0).optional()
});

export type ProfileType = z.infer<typeof profileSchema>;