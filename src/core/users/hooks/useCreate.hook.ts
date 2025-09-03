import { useMutation, useQueryClient } from "@tanstack/react-query";
import { USERS_API } from '@/core/users/consts/endpoints.enum';
import { api } from '@/packages/axios';
import type { CreateUserType } from '@/core/users/types/user.type';
import { USERS_QUERY_KEY } from './useList.hook';

interface UseCreateUserOptions {
  onSuccess?: () => void;
  onError?: (error: Error) => void;
}

export const useCreateUser = (options?: UseCreateUserOptions) => {
  const queryClient = useQueryClient();
  
  const createUserApi = api<CreateUserType, any>({
    method: 'POST',
    endpoint: USERS_API.CREATE,
    mode: 'private',
  });

  return useMutation({
    mutationFn: async (userData: CreateUserType) => {
      try {
        const response = await createUserApi(userData);
        return response.data;
      } catch (error: unknown) {
        const errorMessage = error && 
          typeof error === 'object' && 
          'response' in error && 
          error.response && 
          typeof error.response === 'object' &&
          'data' in error.response &&
          error.response.data &&
          typeof error.response.data === 'object' &&
          'message' in error.response.data
            ? String(error.response.data.message)
            : 'Failed to create user. Please try again.';
            
        throw new Error(errorMessage);
      }
    },
    onSuccess: () => {
      // Invalidate and refetch users list
      queryClient.invalidateQueries({ queryKey: [USERS_QUERY_KEY] });
      
      // Call the success callback if provided
      if (options?.onSuccess) {
        options.onSuccess();
      }
    },
    onError: (error: Error) => {
      console.error('Error creating user:', error);
      
      // Call the error callback if provided
      if (options?.onError) {
        options.onError(error);
      }
    },
  });
};