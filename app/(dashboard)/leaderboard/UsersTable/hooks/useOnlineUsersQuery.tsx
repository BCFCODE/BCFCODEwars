import DatabaseAPIService from "@/app/api/services/db";
import usersQueryKeys from "@/ReactQuery/queryKeys/users";
import { useQuery } from "@tanstack/react-query";

const { getOnlineUsers } = new DatabaseAPIService();

const useOnlineUsersQuery = () => {
  return useQuery({
    queryKey: [usersQueryKeys.onlineUsers],
    queryFn: async () => {
      const res = await getOnlineUsers();
      if (!res.success) {
        throw new Error(res.error || "Failed to fetch online users");
      }
      return { list: res.list, totalUsers: res.totalUsers };
    },
    retry: 2,
  });
};

export default useOnlineUsersQuery;
