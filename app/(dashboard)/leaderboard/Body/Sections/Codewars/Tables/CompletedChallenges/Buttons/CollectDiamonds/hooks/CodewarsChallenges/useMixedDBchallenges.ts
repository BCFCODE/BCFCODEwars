import useCodewarsContext from "@/app/context/hooks/codewars/useCodewarsContext";
import useDBCurrentUserContext from "@/app/context/hooks/db/useDBCurrentUserContext";
import { CodewarsCompletedChallenge } from "@/types/codewars";
import { useRef } from "react";

const useMixedDBchallenges = () => {
  const { currentUser } = useDBCurrentUserContext();
  const { completedChallenges } = useCodewarsContext();

  const dbCodeChallengesList = currentUser.codewars.codeChallenges.list;

  // const filteredCompletedChallenges = completedChallenges?.filter(
  //   (challenge) =>
  //     !dbCodeChallengesList.some(
  //       (dbChallenge) => dbChallenge.id === challenge.id
  //     )
  // );
  // console.log("filteredCompletedChallenges", filteredCompletedChallenges);

  const completedChallengesRef =
    useRef<CodewarsCompletedChallenge[]>(dbCodeChallengesList);
  console.log("currentUser in useMixedDBchallenges", currentUser);

  return {
    currentUser,
    completedChallenges,
    completedChallengesRef,
  };
};

export default useMixedDBchallenges;
