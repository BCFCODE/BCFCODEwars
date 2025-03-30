import DiamondsService from "@/app/services/diamonds";
import { CodewarsCompletedChallenge } from "@/types/codewars";
import { Dispatch } from "react";
import { CollectButtonAction } from "../reducers/collectButtonReducer";
import CodewarsAPIService from "@/app/api/services/codewars";
import { CodewarsAction } from "@/app/context/reducers/codewarsReducer";
import { DiamondsAction } from "@/app/context/reducers/diamondsReducer";
import { RewardStatus } from "@/types/diamonds";
import { CurrentUser } from "@/types/users";

const { getSingleChallenge } = new CodewarsAPIService();
const { collectDiamonds } = new DiamondsService();

interface Props {
  collectButtonDispatch: Dispatch<CollectButtonAction>;
  diamondsContextDispatch: Dispatch<DiamondsAction>;
  codewarsContextDispatch: Dispatch<CodewarsAction>;
  currentChallenge: CodewarsCompletedChallenge;
  currentUser: CurrentUser;
}

const handleClick = async ({
  collectButtonDispatch,
  diamondsContextDispatch,
  codewarsContextDispatch,
  currentChallenge,
  currentUser,
}: Props) => {
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

    // console.log("selectedSingleChallenge", selectedSingleChallenge);
    collectButtonDispatch({
      type: "SUCCESSFUL_RESPONSE",
      collectedDiamondsCount,
      success: true,
    });

    const selectedChallenge: Required<CodewarsCompletedChallenge> = {
      ...currentChallenge,
      rewardStatus: RewardStatus.ClaimedDiamonds,
      moreDetails: selectedSingleChallenge,
    };

    codewarsContextDispatch({
      type: "SET_SELECTED_CHALLENGE",
      selectedChallenge,
    });
  }

  if (!response.success) {
    diamondsContextDispatch({ type: "!SUCCESSFUL_RESPONSE" });
    collectButtonDispatch({ type: "LOADING...", isLoading: false });
    collectButtonDispatch({ type: "!SUCCESSFUL_RESPONSE", success: false });
    collectButtonDispatch({ type: "RESET_COUNTER" });
  }
};

export default handleClick;
