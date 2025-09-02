import { USERS_API } from "@/core/users/consts/endpoints.enum";
import type { UserType } from "@/core/users/types/user.type";
import { api } from "@/packages/axios";

type ListUserRequest = { q?: string; _page?: number; _limit?: number };

export const listUserApi = api<ListUserRequest, UserType[]>({
  endpoint: USERS_API.LIST,
  method: "GET",
  mode: 'private',
});