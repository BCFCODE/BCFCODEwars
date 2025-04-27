import useCurrentUserContext from "@/app/context/hooks/db/useCurrentUserContext";
import { CodeChallengesFilter, RewardStatus } from "@/types/diamonds";
// import useUntrackedChallenges from "./useUntrackedChallenges";
import { CodewarsCompletedChallenge } from "@/types/codewars";
// import useCurrentUserDispatchContext from "@/app/context/hooks/db/useCurrentUserDispatchContext";
// import useCodewarsContext from "@/app/context/hooks/codewars/useCodewarsContext";
// import { addTrackedFlagsToChallenges } from "../../../../../Collapse/utils/addTrackedFlags";
// import useCollectButtonState from "../../Buttons/CollectDiamonds/hooks/useCollectButtonState";
// import useDiamondsContext from "@/app/context/hooks/diamonds/useDiamondsContext";

export interface UseFilter {
  activeFilter: string;
  both: CodewarsCompletedChallenge[];
  claimed: CodewarsCompletedChallenge[];
  unClaimed: CodewarsCompletedChallenge[];
  // untrackedChallenges: CodewarsCompletedChallenge[];
}

const useFilter = (): UseFilter => {
  // console.log("useFilter Rendered...");
  // const {  isCollected } = useDiamondsContext();
  const { currentUser } = useCurrentUserContext();
  // const { selectedChallenge } = useCodewarsContext();

  // const { untrackedChallenges } = useUntrackedChallenges(currentUser);

  const activeFilter: CodeChallengesFilter =
    currentUser.codewars.codeChallenges.challengeFilter;

  // const list = selectedChallenge
  //   ? addTrackedFlagsToChallenges(
  //       selectedChallenge,
  //       currentUser.codewars.codeChallenges.list
  //     )
  //   : currentUser.codewars.codeChallenges.list;
  const list = currentUser.codewars.codeChallenges.list;
  // console.log(list)

  const both = [/* ...(untrackedChallenges ?? []), */ ...list];

  const claimed = list.filter(
    (challenge) => challenge.rewardStatus === RewardStatus.ClaimedDiamonds
  );

  const unClaimed = [
    /* ...(untrackedChallenges ?? []), */
    ...list.filter(
      (challenge) => challenge.rewardStatus === RewardStatus.UnclaimedDiamonds
    ),
  ];
  /* 
  console.log(
    "useFilter/untrackedChallenges >>",
    untrackedChallenges,
    "selectedChallenge >>",
    selectedChallenge

    // "useFilter/mostRecentUntrackedChallenge",
    // mostRecentUntrackedChallenge
  );
 */
  return {
    activeFilter,
    both,
    claimed,
    unClaimed,
    // untrackedChallenges,
  };
};

export default useFilter;
