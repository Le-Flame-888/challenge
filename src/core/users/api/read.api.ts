import { USERS_API } from "@/core/users/consts/endpoints.enum";
import type { UserType } from "@/core/users/types/user.type";
import { api } from "@/packages/axios";

interface ReadUserParams {
  userId: string | number;
}

interface ReadUserResponse {
  data: UserType;
}

export const readUserApi = api<ReadUserParams, ReadUserResponse>({
  method: "GET",
  endpoint: USERS_API.READ,
  mode: "private",
});
