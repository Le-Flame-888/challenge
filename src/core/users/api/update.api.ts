import { USERS_API } from "@/core/users/consts/endpoints.enum";
import type { UserType } from "@/core/users/types/user.type";
import { api } from "@/packages/axios";

export type UpdateUserType = Partial<Omit<UserType, 'id'>>;

export const updateUserApi = api<UpdateUserType & { userId: number }, UserType>({
  method: "PUT",
  endpoint: USERS_API.UPDATE,
  mode: "private",
});
