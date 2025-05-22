import diamondsQueryKeys from "@/app/context/providers/ReactQuery/queryKeys/diamonds";
import { CodewarsCompletedChallenge } from "@/types/codewars";
import { AuthenticatedUser } from "@/types/users";

/**
 * Generates a stable and unique query key for collecting diamonds
 * from a specific Codewars challenge for a given user.
 *
 * @param payload - The current user and the related Codewars challenge.
 * @returns A tuple used as the query key in React Query.
 */
const getCollectDiamondsQueryKey = (
  payload: {
    currentUser: AuthenticatedUser;
    currentChallenge: CodewarsCompletedChallenge;
  }
): [string, string, string, string] => {
  const { currentUser, currentChallenge } = payload;

  return [
    diamondsQueryKeys.diamonds,
    diamondsQueryKeys.collectButton,
    currentUser.codewars.username,
    currentChallenge.id,
  ];
};

export default getCollectDiamondsQueryKey;
