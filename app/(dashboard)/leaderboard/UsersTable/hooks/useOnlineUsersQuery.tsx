import DatabaseService from "@/app/services/db";
import usersQueryKeys from "@/ReactQuery/queryKeys/users";
import { useQuery } from "@tanstack/react-query";

// const {getOnlineUsers} = new DatabaseService()

const useOnlineUsersQuery = () => {
  return useQuery({
    queryKey: [usersQueryKeys.onlineUsers],
    queryFn: () => {
      // getOnlineUsers()
    },
  });
};

export default useOnlineUsersQuery;
