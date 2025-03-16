// import useCodewarsContext from "@/app/context/hooks/codewars/useCodewarsContext";
// import useCurrentUserDispatchContext from "@/app/context/hooks/db/useDBCurrentUserDispatchContext";
// import useDiamondsContext from "@/app/context/hooks/diamonds/useDiamondsContext";
// import { CurrentUser } from "@/types/db/users";
// import React from "react";
// import useCollectButtonReducer from "./useCollectButtonReducer";

// interface Props {
//   // success: boolean;
//   currentUser: CurrentUser;
//   // currentUserDispatch: Dispatch<CurrentUserAction>;
//   // isDiamondIconButtonDisabled: boolean;
//   // codewarsContextDispatch: Dispatch<CodewarsAction>;
//   // completedChallengesRef: RefObject<CodewarsCompletedChallenge[] | undefined>;
// }

// const useCodeChallengesList = ({ currentUser }: Props) => {
//   const {
//     collectButtonState: { success },
//   } = useCollectButtonReducer();
//   const currentUserDispatch = useCurrentUserDispatchContext();
//   const { selectedChallenge } = useCodewarsContext();

//   if (success) {
//     const list = currentUser.codewars.codeChallenges.list.map((challenge) =>
//       challenge.id === selectedChallenge?.id ? selectedChallenge : challenge
//     );
//     console.log("list in useCodeChallengesListEffect", list, selectedChallenge);
//     currentUserDispatch({
//       type: "UPDATE_CODE_CHALLENGES_LIST",
//       list,
//     });

//     return { success, currentUserDispatch };
//   }
// };

// export default useCodeChallengesList;
