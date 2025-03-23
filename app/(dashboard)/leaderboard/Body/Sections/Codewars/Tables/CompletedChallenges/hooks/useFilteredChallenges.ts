import useCodewarsContext from "@/app/context/hooks/codewars/useCodewarsContext";
import useCurrentUserContext from "@/app/context/hooks/db/useCurrentUserContext";
import { CodewarsCompletedChallenge } from "@/types/codewars";
import { useRef } from "react";
import useSwitch from "../Head/DateCompletedCell/useSwitch";

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

  const completedChallengesRef = useRef<
    CodewarsCompletedChallenge[] | undefined
  >(unCollectedChallenges);

  return {
    currentUser,
    unCollectedChallenges,
    collectedChallenges,
    completedChallengesRef,
    dbCodeChallengesList,
  };
};

export default useFilteredChallenges;
