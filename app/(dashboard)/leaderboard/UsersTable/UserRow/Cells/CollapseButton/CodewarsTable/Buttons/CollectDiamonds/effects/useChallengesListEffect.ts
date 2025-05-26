import DatabaseAPIService from "@/app/api/services/db";
import useCodewarsContext from "@/app/context/hooks/codewars/useCodewarsContext";
import useCurrentUserContext from "@/app/context/hooks/db/useCurrentUserContext";
import useCurrentUserDispatchContext from "@/app/context/hooks/db/useCurrentUserDispatchContext";
import { useEffect, useRef } from "react";
import { useCollectButtonStore } from "../../store/collectButton";

const { postCurrentUser } = new DatabaseAPIService();

interface Props {
  collectedDiamondsCount: number | undefined;
  success: boolean;
}
export default function useChallengesListEffect({
  collectedDiamondsCount = 0,
  success,
}: Props) {
  const { currentUser } = useCurrentUserContext();
  const { selectedChallenge } = useCodewarsContext();
  const currentUserDispatch = useCurrentUserDispatchContext();
  const isListUpdatedRef = useRef(false);
  const isDiamondsUpdatedRef = useRef(false);
  const isIconDisabled = useCollectButtonStore(
    (state) => state.diamonds.isIconDisabled
  );

  useEffect(() => {
    if (success && !isIconDisabled) {
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
        totalItems: currentUser.codewars.codeChallenges.totalItems,
        totalPages: currentUser.codewars.codeChallenges.totalPages,
      });
    }

    if (success && !isDiamondsUpdatedRef.current && selectedChallenge) {
      currentUserDispatch({
        type: "UPDATE_DIAMONDS_TOTALS_AND_RANKS",
        reward: collectedDiamondsCount,
        selectedChallenge,
      });

      isDiamondsUpdatedRef.current = true; // Prevents duplicate dispatch
    }

    if (!success) {
      isListUpdatedRef.current = false;
      isDiamondsUpdatedRef.current = false;
    }
  }, [
    success,
    isIconDisabled,
    collectedDiamondsCount,
    currentUserDispatch,
    selectedChallenge,
  ]);
}
