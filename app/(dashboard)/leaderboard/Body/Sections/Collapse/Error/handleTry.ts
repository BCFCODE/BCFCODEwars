import { CodewarsAction } from "@/app/context/reducers/codewars/types";
import CodewarsService from "@/app/services/codewars-service";
import { CurrentUser, DBUser } from "@/types/db/users";
import { Dispatch } from "react";

const { getCompletedChallenges } = new CodewarsService();

export const handleTry = async (
  currentUser: CurrentUser,
  pageNumber: number,
  dispatch: Dispatch<CodewarsAction>
) => {
  try {
    const response = await getCompletedChallenges(
      currentUser.codewars.username,
      pageNumber
    );

    if ("data" in response) {
      const { data: completedChallenges } = response.data;
      // setCompletedChallenges(challenges);
      dispatch({ type: "SET_ERROR", isError: false });
      dispatch({ type: "SET_COMPLETED_CHALLENGES", completedChallenges });
    } else {
      // TODO: Handle cases where data is missing
    }
  } catch (error) {
    // TODO: Handle errors gracefully
    // console.error("Error fetching challenges: ", error);
    dispatch({ type: "SET_ERROR", isError: true });
    // setError(true);
  } finally {
    dispatch({ type: "SET_LOADING", isLoading: false });
    // setIsLoading(false);

    // TODO: Add additional cleanup or updates if needed
  }
};

export default handleTry;
