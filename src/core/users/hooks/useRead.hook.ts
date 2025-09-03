import { useQuery } from '@tanstack/react-query';
import { readUserApi } from '../api/read.api';
import type { UserType } from '../types/user.type';

export const useReadUser = (userId: number) => {
  return useQuery<UserType, Error>({
    queryKey: ['users', userId],
    queryFn: async () => {
      try {
        if (!userId) {
          throw new Error('User ID is required');
        }
        
        console.log('useReadUser - Fetching user with ID:', userId);
        const response = await readUserApi({ 
          params: { userId: String(userId) } 
        });
        
        // Ensure we have the expected data structure
        if (!response.data) {
          throw new Error('No user data received from server');
        }
        
        const userData = response.data;
        console.log('useReadUser - User data received:', userData);
        
        // Return the user data directly without the data wrapper
        return userData;
      } catch (error) {
        console.error('useReadUser - Error fetching user:', {
          userId,
          error: error instanceof Error ? error.message : 'Unknown error',
          fullError: error
        });
        throw error;
      }
    },
    enabled: !!userId,
    retry: 1,
  });
};