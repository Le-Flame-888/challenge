import { USERS_API } from "@/core/users/consts/endpoints.enum";
import type { UserType, UpdateUserType } from "@/core/users/types/user.type";
import { api } from "@/packages/axios";

interface UpdateUserResponse {
  data: UserType;
  message?: string;
}

export const updateUserApi = (data: UpdateUserType) => {
  const endpoint = USERS_API.UPDATE.replace(':userId', data.id.toString());
  return api<UpdateUserType, UpdateUserResponse>({
    method: "PUT",
    endpoint,
    mode: "private",
  })(data);
};

// Helper function to prepare the update data
export const prepareUpdateData = (data: UpdateUserType): UpdateUserType => {
  const { id, ...updateData } = data;
  
  // Remove any undefined values
  Object.keys(updateData).forEach(key => {
    if (updateData[key as keyof typeof updateData] === undefined) {
      delete updateData[key as keyof typeof updateData];
    }
  });
  
  return updateData;
};
