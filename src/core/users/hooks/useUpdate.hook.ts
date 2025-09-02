import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";
import { updateUserApi, type UpdateUserType } from "../api/update.api";

export const useUpdateUser = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  
  return useMutation({
    mutationFn: ({ userId, ...userData }: UpdateUserType & { userId: number }) => 
      updateUserApi({ userId, ...userData }),
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries({ queryKey: ['users'] });
      queryClient.invalidateQueries({ queryKey: ['users', variables.userId] });
      navigate({ to: `/${variables.userId}` });
    },
  });
};