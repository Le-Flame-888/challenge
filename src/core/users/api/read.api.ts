import { USERS_API } from "@/core/users/consts/endpoints.enum";
import type { UserType } from "@/core/users/types/user.type";
import { api } from "@/packages/axios";

export const readUserApi = api<{ userId: number }, UserType>({
  method: "GET",
  endpoint: USERS_API.READ,
  mode: "private",
});
