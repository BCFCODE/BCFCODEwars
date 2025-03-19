import { CodewarsAction } from "@/app/context/reducers/codewars/types";
import { DiamondsAction } from "@/app/context/reducers/diamonds/types";
import CodewarsService from "@/app/services/codewars-service";
import DiamondsService from "@/app/services/diamonds-service";
import { CodewarsCompletedChallenge, CodewarsUser } from "@/types/codewars";
import { CurrentUser } from "@/types/db/users";
import { Dispatch, RefObject } from "react";
import { CollectButtonAction } from "../reducers/collectButtonReducer";
// import useSelectedChallenge from "../hooks/CodewarsChallenges/useSelectedChallenge";
import { RewardStatus } from "@/types/db/diamonds";
import { CurrentUserAction } from "@/app/context/reducers/users/currentUser/types";
import useAllUsersContext from "@/app/context/hooks/db/useAllUsersContext";
import { AllUsersAction } from "@/app/context/reducers/users/allUsers/types";

const { getSingleChallenge } = new CodewarsService();
const { collectDiamonds } = new DiamondsService();

interface Props {
  allUsersDispatch: Dispatch<AllUsersAction>;
  success: boolean;
  isDiamondIconButtonDisabled: boolean;
  diamondsContextDispatch: Dispatch<DiamondsAction>;
  collectButtonDispatch: Dispatch<CollectButtonAction>;
  codewarsContextDispatch: Dispatch<CodewarsAction>;
  completedChallengesRef: RefObject<CodewarsCompletedChallenge[] | undefined>;
  currentChallenge: CodewarsCompletedChallenge;
  currentUser: CurrentUser;
  currentUserDispatch: Dispatch<CurrentUserAction>;
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
  currentUserDispatch,
  success,
  isDiamondIconButtonDisabled,
  allUsersDispatch,
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
    console.log("selectedChallenge", selectedChallenge);
    // Update codeChallenges.list in codewars collection in db
    // const { codewarsUsers }: { codewarsUsers: CodewarsUser[] } =
    //   await useSelectedChallenge({
    //     codewarsContextDispatch,
    //     selectedChallenge,
    //     currentUser,
    //   });

    // completedChallengesRef.current = completedChallenges?.map((challenge) =>
    //   challenge.id === selectedSingleChallenge.id
    //     ? selectedChallenge
    //     : currentChallenge
    // );
  }

  if (!response.success) {
    diamondsContextDispatch({ type: "!SUCCESSFUL_RESPONSE" });
    collectButtonDispatch({ type: "LOADING...", isLoading: false });
    collectButtonDispatch({ type: "!SUCCESSFUL_RESPONSE", success: false });
    collectButtonDispatch({ type: "RESET_COUNTER" });
  }
};

export default handleClick;
