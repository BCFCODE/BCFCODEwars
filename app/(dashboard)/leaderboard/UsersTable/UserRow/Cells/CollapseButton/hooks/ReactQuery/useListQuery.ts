import codewarsQueryKeys from "@/app/context/providers/ReactQuery/queryKeys/codewars";
import { useQuery } from "@tanstack/react-query";

const useListQuery = () => {
  return useQuery({
    queryKey: codewarsQueryKeys.codewars,
  });
};

export default useListQuery;
