import useCodewarsContext from "@/app/context/hooks/codewars/useCodewarsContext";
import { useUsersStore } from "@/app/store/users";
import { AuthenticatedUser } from "@/types/users";

const useFilteredChallenges = () => {
  const currentUser = useUsersStore(s => s.currentUser) as AuthenticatedUser
  const { completedChallenges: collectedChallenges } = useCodewarsContext();

  const dbCodeChallengesList = currentUser.codewars.codeChallenges.list;

  const unCollectedChallenges = collectedChallenges?.filter(
    (challenge) =>
      !dbCodeChallengesList.some(
        (dbChallenge) => dbChallenge.id === challenge.id
      )
  );

  return {
    
    unCollectedChallenges,
    collectedChallenges,
    dbCodeChallengesList,
  };
};

export default useFilteredChallenges;
