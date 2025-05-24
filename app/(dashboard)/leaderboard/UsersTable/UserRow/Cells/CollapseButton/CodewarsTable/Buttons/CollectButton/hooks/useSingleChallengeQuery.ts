import CodewarsAPIService from "@/app/api/services/codewars";
import useCurrentUserContext from "@/app/context/hooks/db/useCurrentUserContext";
import codewarsQueryKeys from "@/app/context/providers/ReactQuery/queryKeys/codewars";
import { CodewarsCompletedChallenge } from "@/types/codewars";
import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";

const { getSingleChallenge } = new CodewarsAPIService();

interface TQueryFnData {
  isUserOnPersonalDashboard: boolean;
}

interface Props {
  currentChallenge: CodewarsCompletedChallenge;
}

const useSingleChallengeQuery = ({ currentChallenge }: Props) => {
  const { currentUser } = useCurrentUserContext();

  return useQuery<TQueryFnData, Error>({
    queryKey: [codewarsQueryKeys.singleChallenge],
    queryFn: async () => {
      const response = await getSingleChallenge(
        currentUser.codewars.username,
        currentChallenge.id
      );
      return 
    },
    enabled: false,
  });
};

export default useSingleChallengeQuery;
