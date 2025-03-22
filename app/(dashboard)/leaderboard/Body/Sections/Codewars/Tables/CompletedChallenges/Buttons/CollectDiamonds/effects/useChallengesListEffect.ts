import useCodewarsContext from "@/app/context/hooks/codewars/useCodewarsContext";
import { CodewarsAction } from "@/app/context/reducers/codewarsReducer";
import { CurrentUserAction } from "@/app/context/reducers/currentUserReducer";
import { CodewarsCompletedChallenge } from "@/types/codewars";
import { CurrentUser } from "@/types/users";
import { Dispatch, RefObject, useEffect, useRef } from "react";
import APIdbService from "@/app/api/services/db-service";
import useCurrentUserContext from "@/app/context/hooks/db/useCurrentUserContext";
import useCurrentUserDispatchContext from "@/app/context/hooks/db/useCurrentUserDispatchContext";

const { postCurrentUser } = new APIdbService();

interface Props {
  collectedDiamondsCount: number | undefined;
  success: boolean;
  currentUser: CurrentUser;
  currentUserDispatch: Dispatch<CurrentUserAction>;
  isDiamondIconButtonDisabled: boolean;
  isCollected: boolean;
  codewarsContextDispatch: Dispatch<CodewarsAction>;
  completedChallengesRef: RefObject<CodewarsCompletedChallenge[] | undefined>;
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

    if (success && !isDiamondsUpdatedRef.current) {
      currentUserDispatch({
        type: "UPDATE_CODEWARS_DIAMONDS_SUM",
        reward: collectedDiamondsCount,
      });
      isDiamondsUpdatedRef.current = true; // Prevents duplicate dispatch
    }

    if (!success) {
      isListUpdatedRef.current = false;
      isDiamondsUpdatedRef.current = false;
    }
  }, [success, isDiamondIconButtonDisabled]);
}
