import { CodewarsAction } from "@/app/context/reducers/codewars/types";
import { CodewarsCompletedChallenge } from "@/types/codewars";
import { CurrentUser } from "@/types/db/users";
import { Dispatch } from "react";
import useCodewarsDB from "./useCodewarsDB";

interface Props {
  currentUser: CurrentUser;
  selectedChallenge: CodewarsCompletedChallenge;
  codewarsContextDispatch: Dispatch<CodewarsAction>;
}

export default async function useSelectedChallenge({
  currentUser,
  selectedChallenge,
  codewarsContextDispatch,
}: Props) {
  codewarsContextDispatch({
    type: "SET_SELECTED_CHALLENGE",
    selectedChallenge,
  });

  useCodewarsDB({ currentUser, selectedChallenge });
}
