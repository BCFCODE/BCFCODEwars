import dbAPIService from "@/app/api/services/db";
import useCodewarsContext from "@/app/context/hooks/codewars/useCodewarsContext";
import useCurrentUserContext from "@/app/context/hooks/db/useCurrentUserContext";
import useCurrentUserDispatchContext from "@/app/context/hooks/db/useCurrentUserDispatchContext";
import { useEffect, useRef } from "react";
import { updateChallengeInListAsTracked } from "../utils/markChallengeAsTracked";

const { postCurrentUser } = new dbAPIService();

interface Props {
  collectedDiamondsCount: number | undefined;
  success: boolean;
  isDiamondIconButtonDisabled: boolean;
}
export default function useChallengesListEffect({
  collectedDiamondsCount = 0,
  success,
  isDiamondIconButtonDisabled,
}: Props) {
  const { currentUser } = useCurrentUserContext();
  const { selectedChallenge } = useCodewarsContext();
  const currentUserDispatch = useCurrentUserDispatchContext();
  const isListUpdatedRef = useRef(false);
  const isDiamondsUpdatedRef = useRef(false);

  useEffect(() => {
    if (success && !isDiamondIconButtonDisabled) {
      const list = currentUser.codewars.codeChallenges.list.map((challenge) =>
        challenge.id === selectedChallenge?.id ? selectedChallenge : challenge
      );

      if (!isListUpdatedRef.current) {
        const userWithUpdatedList = { ...currentUser };
        userWithUpdatedList.codewars.codeChallenges.list = [...list];
        postCurrentUser(userWithUpdatedList);
        isListUpdatedRef.current = true;
      }

      currentUserDispatch({
        type: "UPDATE_CODE_CHALLENGES_LIST",
        list,
      });
    }

    if (success && !isDiamondsUpdatedRef.current && selectedChallenge) {
      currentUserDispatch({
        type: "UPDATE_DIAMONDS_TOTALS_AND_RANKS",
        reward: collectedDiamondsCount,
        selectedChallenge,
      });
const untrackedChallenges =  currentUser.codewars.codeChallenges.untrackedChallenges
      // const untrackedChallenges = updateChallengeInListAsTracked(
      //   selectedChallenge,
      //   currentUser.codewars.codeChallenges.untrackedChallenges
      // );
      // currentUserDispatch({
      //   type: "ADD_UNTRACKED_CHALLENGES",
      //   untrackedChallenges: updateChallengeInListAsTracked(
      //     selectedChallenge,
      //     untrackedChallenges
      //   ),
      // });
      // currentUserDispatch({type: })
      console.log(
        `useChallengesListEffect/currentUser and selectedChallenge`,
        currentUser,
        selectedChallenge,
        untrackedChallenges,
        updateChallengeInListAsTracked(selectedChallenge, untrackedChallenges)
      );
      // console.log("selectedChallenge", selectedChallenge);
      isDiamondsUpdatedRef.current = true; // Prevents duplicate dispatch
      // console.log("currentUser in useChallengesListEffect", currentUser);
    }

    if (!success) {
      isListUpdatedRef.current = false;
      isDiamondsUpdatedRef.current = false;
    }
  }, [success, isDiamondIconButtonDisabled]);
}
