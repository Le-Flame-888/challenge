import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteUserApi } from "../api/delete.api";
import type { UserType } from "../schemas/user.schema";

export const useDeleteUser = () => {
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
    onError: (_err, _variables, context) => {
      if (context?.previousUsers) {
        queryClient.setQueryData(['users'], context.previousUsers);
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] });
    },
  });
};