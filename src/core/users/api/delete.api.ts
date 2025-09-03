import { USERS_API } from "@/core/users/consts/endpoints.enum";
import { api } from "@/packages/axios";

export const deleteUserApi = (data: { userId: number }) => {
  const endpoint = USERS_API.DELETE.replace(':userId', data.userId.toString());
  return api<{ userId: number }, void>({
    method: "DELETE",
    endpoint,
    mode: "private",
  })(data);
};