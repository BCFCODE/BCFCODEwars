import { Dispatch } from "react";
import { CurrentUserAction } from "@/app/context/reducers/users/currentUser/types";
import { CodewarsAction } from "@/app/context/reducers/codewars/types";
import { CurrentUser } from "@/types/db/users";
import fetchCompletedChallenges from "./fetchCompletedChallenges";

interface Props {
  isCollapse: boolean;
  pageNumber: number;
  currentUser: CurrentUser;
  currentUserDispatch: Dispatch<CurrentUserAction>;
  codewarsDispatch: Dispatch<CodewarsAction>;
}

const handleOpen = async ({
  pageNumber,
  currentUserDispatch,
  codewarsDispatch,
  isCollapse,
  currentUser,
}: Props) => {
  currentUserDispatch({ type: "SET_COLLAPSE_OPEN", isCollapse: !isCollapse });
  codewarsDispatch({ type: "SET_LOADING", isLoading: true });
  fetchCompletedChallenges(currentUser, pageNumber, codewarsDispatch);
};

export default handleOpen;
