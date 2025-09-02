import { listUserApi } from "@/core/users/api/list.api";
import { useQuery } from "@tanstack/react-query";
import type { UserType } from "@/core/users/types/user.type";

export enum USERS_QUERY_KEY {
  LIST = 'users',
}

interface UseListUsersProps {
  search?: string;
  page?: number;
  limit?: number;
  role?: UserType['role'] | null;
  isActive?: boolean | null;
}

export function useListUsers({ search, page = 1, limit = 10, role, isActive }: UseListUsersProps) {
  return useQuery({
    queryKey: [USERS_QUERY_KEY.LIST, search, page, limit, role, isActive],
    queryFn: async () => {
      const query: Record<string, any> = {
        q: search,
        _page: page,
        _limit: limit,
      };

      if (role) {
        query.role = role;
      }

      if (isActive !== undefined && isActive !== null) {
        query.isActive = isActive;
      }

      const { data, headers } = await listUserApi({ query });
      return { 
        data, 
        total: headers['x-total-count'] ? Number(headers['x-total-count']) : 0 
      };
    },
  });
}