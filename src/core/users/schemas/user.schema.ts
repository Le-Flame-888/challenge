import { profileSchema } from "@/core/users/schemas/profile.schema";
import z from "zod";

export const userSchema = z.object({
  id: z.string(),
  email: z.string(),
  profile: profileSchema,
  isActive: z.boolean(),
});

export type UserType = z.infer<typeof userSchema>;