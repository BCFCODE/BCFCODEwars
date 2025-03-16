import { CurrentUserAction } from "@/app/context/reducers/users/currentUser/types";
import { CodewarsCompletedChallenge } from "@/types/codewars";
import { RewardStatus } from "@/types/db/diamonds";
import { Dispatch } from "react";

interface Props {
  currentUserDispatch: Dispatch<CurrentUserAction>;
  data: CodewarsCompletedChallenge[];
}

const initializeCodeChallengesList = ({ data, currentUserDispatch }: Props) => {
  const completedChallenges = data.map((challenge) => ({
    ...challenge,
    rewardStatus: RewardStatus.UnclaimedDiamonds,
  }));

  currentUserDispatch({
    type: "UPDATE_CODE_CHALLENGES_LIST",
    list: completedChallenges,
  });
  currentUserDispatch({
    type: "SET_COLLAPSE_OPEN",
    isCollapse: true
  })
};

export default initializeCodeChallengesList;
