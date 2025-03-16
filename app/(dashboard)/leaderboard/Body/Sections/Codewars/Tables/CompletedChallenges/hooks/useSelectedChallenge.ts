// import { CodewarsAction } from "@/app/context/reducers/codewars/types";
// import { CodewarsCompletedChallenge, CodewarsUser } from "@/types/codewars";
// import { CurrentUser } from "@/types/db/users";
// import { Dispatch } from "react";
// import saveChallengeListToDB from "../Buttons/CollectDiamonds/hooks/saveChallengeListToDB";

// interface Props {
//   currentUser: CurrentUser;
//   selectedChallenge: CodewarsCompletedChallenge;
//   codewarsContextDispatch: Dispatch<CodewarsAction>;
// }

// export default async function useSelectedChallenge({
//   currentUser,
//   selectedChallenge,
//   codewarsContextDispatch,
// }: Props): Promise<{ codewarsUsers: CodewarsUser[] }> {
//   const { codewarsUsers } = await saveChallengeListToDB({
//     currentUser,
//     selectedChallenge,
//   });

//   // console.log("codewarsUsers in useSelectedChallenge", codewarsUsers);
//   codewarsContextDispatch({
//     type: "SET_SELECTED_CHALLENGE",
//     selectedChallenge,
//   });

//   codewarsContextDispatch({
//     type: "UPDATE_CODEWARS_USERS",
//     codewarsUsers,
//   });

//   return { codewarsUsers };
// }
