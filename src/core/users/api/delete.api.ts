import { USERS_API } from "@/core/users/consts/endpoints.enum";
import { api } from "@/packages/axios";

export const deleteUserApi = api<{ userId: number }, void>({
  method: "DELETE",
  endpoint: USERS_API.DELETE,
  mode: "private",
});