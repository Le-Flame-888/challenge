import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteUserApi } from "../api/delete.api";
import type { UserType } from "../schemas/user.schema";

interface UseDeleteUserOptions {
  onSuccess?: () => void;
  onError?: (error: Error) => void;
}

export const useDeleteUser = (options?: UseDeleteUserOptions) => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (userId: number) => deleteUserApi({ userId }),
    onMutate: async (deletedUserId) => {
      await queryClient.cancelQueries({ queryKey: ['users'] });
      const previousUsers = queryClient.getQueryData<UserType[]>(['users']);

      queryClient.setQueryData(['users'], (old: UserType[] | undefined) => 
        old ? old.filter(user => user.id !== deletedUserId) : []
      );

      return { previousUsers };
    },
    onSuccess: () => {
      if (options?.onSuccess) {
        options.onSuccess();
      }
    },
    onError: (error: Error, _variables, context) => {
      if (context?.previousUsers) {
        queryClient.setQueryData(['users'], context.previousUsers);
      }
      if (options?.onError) {
        options.onError(error);
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] });
    },
  });
};