import CodewarsAPIService from "@/app/api/services/codewars";
import useCurrentUserContext from "@/app/context/hooks/db/useCurrentUserContext";
import codewarsQueryKeys from "@/app/context/providers/ReactQuery/queryKeys/codewars";
import {
  CodewarsCompletedChallenge,
  CodewarsSingleChallenge,
} from "@/types/codewars";
import { useQuery } from "@tanstack/react-query";

const { getSingleChallenge } = new CodewarsAPIService();

interface UseSingleChallengeQueryProps {
  currentChallenge: CodewarsCompletedChallenge;
}

const useSingleChallengeQuery = ({
  currentChallenge,
}: UseSingleChallengeQueryProps) => {
  const { currentUser } = useCurrentUserContext();

  const username = currentUser?.codewars?.username;
  const challengeId = currentChallenge?.id;

  return useQuery<CodewarsSingleChallenge, Error, CodewarsSingleChallenge>({
    queryKey: [codewarsQueryKeys.singleChallenge, username, challengeId],
    queryFn: async () => {
      if (!username || !challengeId) {
        throw new Error("Missing username or challenge ID");
      }

      const { success, data, error } = await getSingleChallenge(
        username,
        challengeId
      );

      if (!success || !data || error) {
        throw new Error(
          `Failed to fetch challenge: ${error ?? "Unknown error"}`
        );
      }

      return data;
    },
    enabled: false,
  });
};

export default useSingleChallengeQuery;
