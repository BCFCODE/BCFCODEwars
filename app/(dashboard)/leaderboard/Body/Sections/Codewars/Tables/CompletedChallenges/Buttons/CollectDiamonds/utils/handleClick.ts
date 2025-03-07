import { CodewarsAction } from "@/app/context/reducers/codewars/types";
import { Action } from "@/app/context/reducers/diamonds/types";
import CodewarsService from "@/app/services/codewars-service";
import DiamondsService from "@/app/services/diamonds-service";
import { CodewarsCompletedChallenge } from "@/types/codewars";
import { CurrentUser } from "@/types/db/users";
import { Dispatch, RefObject } from "react";
import useSelectedSingleChallenge from "../hooks/useSelectedSingleChallenge";
import { CollectButtonAction } from "../reducers/collectButtonReducer";

const { getSingleChallenge } = new CodewarsService();
const { collectDiamonds } = new DiamondsService();

interface Props {
  diamondsContextDispatch: Dispatch<Action>;
  collectButtonDispatch: Dispatch<CollectButtonAction>;
  codewarsContextDispatch: Dispatch<CodewarsAction>;
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

    const selectedChallenge: CodewarsCompletedChallenge = {
      ...currentChallenge,
      moreDetails: selectedSingleChallenge,
    };

    codewarsContextDispatch({
      type: "SET_SELECTED_CHALLENGE",
      selectedChallenge,
    });

    // Update codeChallenges.list in codewars collection in db
    useSelectedSingleChallenge({ selectedChallenge, currentUser });

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
