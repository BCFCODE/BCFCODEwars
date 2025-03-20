import { CurrentUserAction } from "@/app/context/reducers/currentUserReducer";
import { CodewarsCompletedChallenge } from "@/types/codewars";
import { RewardStatus } from "@/types/diamonds";
import { CurrentUser } from "@/types/users";
import { Dispatch } from "react";
import saveChallengeListToDB from "../utils/saveChallengeListToDB";

interface Props {
  currentUser: CurrentUser;
  currentUserDispatch: Dispatch<CurrentUserAction>;
  data: CodewarsCompletedChallenge[];
}

const initializeCodeChallengesList = ({
  data,
  currentUser,
  currentUserDispatch,
}: Props) => {
  const list = data.map((challenge) => ({
    ...challenge,
    rewardStatus: RewardStatus.UnclaimedDiamonds,
  }));

  currentUserDispatch({
    type: "UPDATE_CODE_CHALLENGES_LIST",
    list,
  });

  saveChallengeListToDB({ list, currentUser });
};

export default initializeCodeChallengesList;
