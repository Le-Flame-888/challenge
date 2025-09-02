import { USERS_API } from "@/core/users/consts/endpoints.enum";
import type { UserType } from "@/core/users/schemas/user.schema";
import { api } from "@/packages/axios";

export const listUserApi = api<undefined, UserType[]>({
  endpoint: USERS_API.LIST,
  method: "GET",
  mode: 'private',
})