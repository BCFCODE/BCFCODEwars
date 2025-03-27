import APIdbService from "@/app/api/services/db-service";
import useCodewarsContext from "@/app/context/hooks/codewars/useCodewarsContext";
import useCurrentUserContext from "@/app/context/hooks/db/useCurrentUserContext";
import useCurrentUserDispatchContext from "@/app/context/hooks/db/useCurrentUserDispatchContext";
import { useEffect, useRef } from "react";

const { postCurrentUser } = new APIdbService();

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
      console.log("selectedChallenge", selectedChallenge);
      isDiamondsUpdatedRef.current = true; // Prevents duplicate dispatch
      console.log("currentUser in useChallengesListEffect", currentUser);
    }

    if (!success) {
      isListUpdatedRef.current = false;
      isDiamondsUpdatedRef.current = false;
    }
  }, [success, isDiamondIconButtonDisabled]);
}
