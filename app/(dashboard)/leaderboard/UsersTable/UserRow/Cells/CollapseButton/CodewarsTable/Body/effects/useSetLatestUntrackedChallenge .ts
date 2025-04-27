// import useCurrentUserDispatchContext from "@/app/context/hooks/db/useCurrentUserDispatchContext";
// import { CodewarsCompletedChallenge } from "@/types/codewars";
// import { useEffect } from "react";
// import { markChallengeAsUntracked } from "../utils/markChallengeAsUntracked";

// const useSetLatestUntrackedChallenge = (
//   untrackedChallenges: CodewarsCompletedChallenge[]
// ) => {
//   const currentUserDispatch = useCurrentUserDispatchContext();

//   useEffect(() => {
//     if (untrackedChallenges.length === 0) return;

//     const [mostRecentUntrackedChallenge] = untrackedChallenges;

//     currentUserDispatch({
//       type: "SET_LATEST_UNTRACKED_CHALLENGE",
//       mostRecentUntrackedChallenge: markChallengeAsUntracked(
//         mostRecentUntrackedChallenge
//       ),
//     });
//   }, [untrackedChallenges, currentUserDispatch]);
// };

// export default useSetLatestUntrackedChallenge;
