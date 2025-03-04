import { Action } from "@/app/context/reducers/diamonds/types";
import CodewarsService from "@/app/services/codewars-service";
import { Dispatch, RefObject } from "react";
import { CollectButtonAction } from "../reducers/collectButtonReducer";
import DiamondsService from "@/app/services/diamonds-service";
import { CodewarsCompletedChallenge } from "@/types/codewars";
import { CodewarsContextAction } from "@/app/context/reducers/codewars/types";
import useDBCurrentUserContext from "@/app/context/hooks/db/useDBCurrentUserContext";
import useCodewarsContext from "@/app/context/hooks/codewars/useCodewarsContext";
import { CurrentUserContextState } from "@/app/context/providers/db/currentUser/types";
import { CurrentUser } from "@/types/db/users";
import { CodewarsContextState } from "@/types/contexts";

const { getSingleChallenge } = new CodewarsService();
const { collectDiamonds } = new DiamondsService();

interface Props {
  diamondsContextDispatch: Dispatch<Action>;
  collectButtonDispatch: Dispatch<CollectButtonAction>;
  codewarsContextDispatch: Dispatch<CodewarsContextAction>;
  completedChallengesRef: RefObject<CodewarsCompletedChallenge[] | undefined>;
  currentChallenge: CodewarsCompletedChallenge;
  currentUser: CurrentUser;
  completedChallenges: CodewarsCompletedChallenge[] | undefined;
}

const handleClick = async ({
  collectButtonDispatch,
  diamondsContextDispatch,
  completedChallengesRef,
  codewarsContextDispatch,
  currentChallenge,
  currentUser,
  completedChallenges,
}: Props) => {
  // const { currentUser } = useDBCurrentUserContext();
  // const { completedChallenges } = useCodewarsContext();

  diamondsContextDispatch({ type: "LOADING..." });

  collectButtonDispatch({ type: "LOADING...", isLoading: true });

  const response = await getSingleChallenge(
    currentUser.codewars.username,
    currentChallenge.id
  );

  if (response.success) {
    diamondsContextDispatch({ type: "SET_ERROR", isError: false });

    const { data: selectedSingleChallenge } = response;
    const { collectedDiamondsCount } = await collectDiamonds(
      selectedSingleChallenge
    );

    collectButtonDispatch({
      type: "SUCCESSFUL_RESPONSE",
      collectedDiamondsCount,
    });

    const selectedChallenge = {
      ...currentChallenge,
      details: selectedSingleChallenge,
    };

    codewarsContextDispatch({
      type: "SET_SELECTED_CHALLENGE",
      selectedChallenge: {
        ...currentChallenge,
        details: selectedSingleChallenge,
      },
    });

    completedChallengesRef.current = completedChallenges?.map((challenge) =>
      challenge.id === selectedSingleChallenge.id
        ? selectedChallenge
        : currentChallenge
    );
  }

  if (!response.success) {
    diamondsContextDispatch({ type: "!SUCCESSFUL_RESPONSE" });
    collectButtonDispatch({ type: "LOADING...", isLoading: false });
    collectButtonDispatch({ type: "RESET_COUNTER" });
  }
};

export default handleClick;
