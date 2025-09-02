import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";
import { USERS_API } from '@/core/users/consts/endpoints.enum';
import { api } from '@/packages/axios';
import type { CreateUserType } from '@/core/users/types/user.type';
import { USERS_QUERY_KEY } from './useList.hook';

export const useCreateUser = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  
    const createUserApi = api<CreateUserType, any>({
    method: 'POST',
    endpoint: USERS_API.CREATE,
    mode: 'private',
  });

  return useMutation({
    mutationFn: (userData: CreateUserType) => createUserApi(userData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [USERS_QUERY_KEY] });
      navigate({ to: '/' });
    },
  });
};