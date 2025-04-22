import useCodewarsContext from "@/app/context/hooks/codewars/useCodewarsContext";
import useCurrentUserContext from "@/app/context/hooks/db/useCurrentUserContext";

const useFilteredChallenges = () => {
  const { currentUser } = useCurrentUserContext();
  const { completedChallenges: collectedChallenges } = useCodewarsContext();

  const dbCodeChallengesList = currentUser.codewars.codeChallenges.list;

  const unCollectedChallenges = collectedChallenges?.filter(
    (challenge) =>
      !dbCodeChallengesList.some(
        (dbChallenge) => dbChallenge.id === challenge.id
      )
  );

  return {
    currentUser,
    unCollectedChallenges,
    collectedChallenges,
    dbCodeChallengesList,
  };
};

export default useFilteredChallenges;
