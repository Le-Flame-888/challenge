import { USERS_API } from "@/core/users/consts/endpoints.enum";
import type { UserType } from "@/core/users/types/user.type";
import { api } from "@/packages/axios";

type ListUserRequest = { 
  query?: {
    q?: string;
    _page?: number;
    _limit?: number;
    role?: UserType['role'];
    isActive?: boolean;
  };
};

export const listUserApi = (params: ListUserRequest) => {
  return api<ListUserRequest, UserType[]>({
    endpoint: USERS_API.LIST,
    method: "GET",
    mode: 'private',
  })({ query: params.query });
};