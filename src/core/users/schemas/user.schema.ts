import { profileSchema } from "@/core/users/schemas/profile.schema";
import z from "zod";

export const userSchema = z.object({
  id: z.number(),
  email: z.string().email(),
  profile: profileSchema,
  role: z.enum(['admin', 'user', 'guest']),
  isActive: z.boolean(),
});

export type UserType = z.infer<typeof userSchema>;
export type CreateUserType = Omit<UserType, 'id'>;