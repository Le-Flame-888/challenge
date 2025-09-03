import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateUserApi } from "../api/update.api";
import type { UpdateUserType, UserType } from "../types/user.type";

interface UseUpdateUserOptions {
  onSuccess?: (data: UserType) => void;
  onError?: (error: Error) => void;
  onSettled?: () => void;
}

export const useUpdateUser = (options?: UseUpdateUserOptions) => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (userData: UpdateUserType) => {
      console.log('Updating user with data:', userData);
      const response = await updateUserApi(userData);
      return response.data;
    },
    onSuccess: (data: UserType) => {
      // Invalidate relevant queries
      queryClient.invalidateQueries({ queryKey: ['users'] });
      queryClient.invalidateQueries({ queryKey: ['user', data.id] });
      
      if (options?.onSuccess) {
        options.onSuccess(data);
      }
    },
    onError: (error: Error) => {
      console.error('Error updating user:', error);
      if (options?.onError) {
        options.onError(error);
      }
    },
    onSettled: () => {
      if (options?.onSettled) {
        options.onSettled();
      }
    },
  });
};