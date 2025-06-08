import DatabaseAPIService from "@/app/api/services/db";
import { baseURL } from "@/utils/constants";
import { useMutation } from "@tanstack/react-query";

const { toggleUserIdleStatus } = new DatabaseAPIService();

const useIdleActivityMutation = () => {
  return useMutation({
    mutationFn: toggleUserIdleStatus,
  });
};

export default useIdleActivityMutation;
