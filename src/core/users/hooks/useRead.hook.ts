import { useQuery } from "@tanstack/react-query";
import { readUserApi } from "../api/read.api";

export const useReadUser = (userId: number) => {
  return useQuery({
    queryKey: ['users', userId],
    queryFn: () => readUserApi({ userId }),
    enabled: !!userId,
  });
};