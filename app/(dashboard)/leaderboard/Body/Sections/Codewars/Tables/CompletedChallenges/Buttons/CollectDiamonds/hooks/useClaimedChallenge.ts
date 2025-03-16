import useCodewarsContext from "@/app/context/hooks/codewars/useCodewarsContext";
import useCurrentUserContext from "@/app/context/hooks/db/useCurrentUserContext";
import useCurrentUserDispatchContext from "@/app/context/hooks/db/useDBCurrentUserDispatchContext";
import { CodewarsCompletedChallenge } from "@/types/codewars";
import { useRef } from "react";

const useClaimedChallenge = () => {
  const { currentUser } = useCurrentUserContext();
  const currentUserDispatch = useCurrentUserDispatchContext();
  // const dispatch = useCurrentUserDispatchContext()
  const { completedChallenges, selectedChallenge } = useCodewarsContext();

  const list = currentUser.codewars.codeChallenges.list;
  // console.log("selectedChallenge in useClaimedChallenge", selectedChallenge);
  const completedChallengesRef = useRef<CodewarsCompletedChallenge[]>(list);
  // console.log("currentUser in useClaimedChallenge", currentUser);

  return {
    currentUser,
    currentUserDispatch,
    completedChallenges,
    completedChallengesRef,
  };
};

export default useClaimedChallenge;
