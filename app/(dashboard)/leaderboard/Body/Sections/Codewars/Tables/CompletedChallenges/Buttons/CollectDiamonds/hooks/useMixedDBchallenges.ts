import useCodewarsContext from "@/app/context/hooks/codewars/useCodewarsContext";
import useCurrentUserContext from "@/app/context/hooks/db/useCurrentUserContext";
import useCurrentUserDispatchContext from "@/app/context/hooks/db/useDBCurrentUserDispatchContext";
import { CodewarsCompletedChallenge } from "@/types/codewars";
import { useRef } from "react";

const useMixedDBchallenges = () => {
  const { currentUser } = useCurrentUserContext();
  // const dispatch = useCurrentUserDispatchContext()
  const { completedChallenges } = useCodewarsContext();

  const list = currentUser.codewars.codeChallenges.list;

  const completedChallengesRef =
    useRef<CodewarsCompletedChallenge[]>(list);
  // console.log("currentUser in useMixedDBchallenges", currentUser);

  return {
    currentUser,
    completedChallenges,
    completedChallengesRef,
  };
};

export default useMixedDBchallenges;
