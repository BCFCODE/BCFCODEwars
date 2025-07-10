import usersQueryKeys from "@/ReactQuery/queryKeys/users";
import { useQuery } from "@tanstack/react-query";

const useOnlineUsersQuery = () => {
  return useQuery({
    queryKey: [usersQueryKeys.onlineUsers],
    queryFn: () => {},
  });
};

export default useOnlineUsersQuery;
