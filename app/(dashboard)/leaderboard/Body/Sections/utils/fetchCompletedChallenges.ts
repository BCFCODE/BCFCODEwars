import { CodewarsAction } from "@/app/context/reducers/codewarsReducer";
import { CurrentUserAction } from "@/app/context/reducers/currentUserReducer";
import { CurrentUser } from "@/types/users";
import { Dispatch } from "react";
import initializeCodeChallengesList from "../Collapse/initializeCodeChallengesList";
import APICodewarsService from "@/app/api/services/codewars";
// import initializeCodeChallengesList from "./Collapse/initializeCodeChallengesList";

const { getCompletedChallenges } = new APICodewarsService();

interface Props {
  currentUser: CurrentUser;
  currentUserDispatch: Dispatch<CurrentUserAction>;
  codewarsDispatch: Dispatch<CodewarsAction>;
  pageNumber: number;
}

export const fetchCompletedChallenges = async ({
  currentUser,
  currentUserDispatch,
  codewarsDispatch,
  pageNumber,
}: Props) => {
  try {
    const response = await getCompletedChallenges(
      currentUser.codewars.username,
      pageNumber
    );

    if ("data" in response) {
      const { data } = response.data;
      const isListEmpty = !currentUser.codewars.codeChallenges.list.length;
      // console.log("isListEmpty", isListEmpty);

      if (isListEmpty)
        initializeCodeChallengesList({
          data,
          currentUser,
          currentUserDispatch,
        });

      codewarsDispatch({ type: "SET_ERROR", isError: false });
      // codewarsDispatch({
      //   type: "SET_COMPLETED_CHALLENGES",
      //   completedChallenges,
      // });
    } else {
      // TODO: Handle cases where data is missing
    }
  } catch (error) {
    // TODO: Handle errors gracefully
    // console.error("Error fetching challenges: ", error);
    codewarsDispatch({ type: "SET_ERROR", isError: true });
    // setError(true);
  } finally {
    codewarsDispatch({ type: "SET_LOADING", isLoading: false });
    // setIsLoading(false);

    // TODO: Add additional cleanup or updates if needed
  }
};

export default fetchCompletedChallenges;
