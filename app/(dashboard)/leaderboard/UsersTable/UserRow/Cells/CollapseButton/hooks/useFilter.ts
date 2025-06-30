import DatabaseAPIService from "@/app/api/services/db";
import useCurrentUserContext from "@/app/context/hooks/useCurrentUserContext";
import { CodewarsCompletedChallenge } from "@/types/codewars";
import { CodeChallengesFilter, RewardStatus } from "@/types/diamonds";
import { useEffect, useMemo, useRef } from "react";
import useCurrentUserMutation from "./useCurrentUserMutation";

export interface UseFilter {
  activeFilter: string;
  both: CodewarsCompletedChallenge[];
  claimed: CodewarsCompletedChallenge[];
  unClaimed: CodewarsCompletedChallenge[];
}

const useFilter = (): UseFilter => {
  const { currentUser } = useCurrentUserContext();

  const activeFilter: CodeChallengesFilter =
    currentUser.codewars.codeChallenges.challengeFilter;

  const list = currentUser.codewars.codeChallenges.list;

  const both = list;

  const claimed = useMemo(
    () =>
      list.filter(
        (challenge) => challenge.rewardStatus === RewardStatus.ClaimedDiamonds
      ),
    [list]
  );

  const unClaimed = useMemo(
    () =>
      list.filter(
        (challenge) => challenge.rewardStatus === RewardStatus.UnclaimedDiamonds
      ),
    [list]
  );

  return {
    activeFilter,
    both,
    claimed,
    unClaimed,
  };
};

export default useFilter;
