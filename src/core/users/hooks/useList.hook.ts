import { listUserApi } from "@/core/users/api/list.api";
import { useQuery } from "@tanstack/react-query";

export const useListUsers = () => {
  const query = useQuery({
    queryKey: ['users'],
    queryFn: async () => listUserApi(),
  });
  return query;
}