import { USERS_API } from "@/core/users/consts/endpoints.enum";
import { userSchema, type UserType } from "@/core/users/schemas/user.schema";
import { api } from "@/packages/axios";
import { z } from "zod";

export const createUserSchema = userSchema.omit({ id: true });

export type CreateUserType = z.infer<typeof createUserSchema>;

export const createUserApi = api<CreateUserType, UserType>({
  method: "POST",
  endpoint: USERS_API.CREATE,
  mode: "private",
});
