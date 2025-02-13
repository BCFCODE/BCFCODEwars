import ErrorButtonContainer from "@/app/components/UI/Error/Buttons/ButtonContainer";
import ErrorUI from "@/app/components/UI/Error/ErrorUI";
import useCodewarsContext from "@/app/context/hooks/useContexts/useCodewarsContext";
import useCodewarsDispatchContext from "@/app/context/hooks/useDispatches/useCodewarsDispatchContext";
import useDBCurrentUserContext from "@/app/context/hooks/useContexts/useDBCurrentUserContext";
import { Action } from "@/app/context/reducers/codewars/types";
import CodewarsService from "@/app/services/codewars-service";
import { DBUser } from "@/types/db/users";
import { Typography, Button } from "@mui/material";
import Link from "next/link";
import React, { Dispatch } from "react";

const { getCompletedChallenges } = new CodewarsService();

export const handleTry = async (
  currentUser: DBUser,
  pageNumber: number,
  dispatch: Dispatch<Action>
) => {
  try {
    const response = await getCompletedChallenges(
      currentUser.codewars.username,
      pageNumber
    );

    if ("data" in response) {
      const { data: completedChallenges } = response.data;
      // setCompletedChallenges(challenges);
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

const Error = () => {
  const { currentUser } = useDBCurrentUserContext();
  const { pageNumber } = useCodewarsContext();
  const dispatch = useCodewarsDispatchContext();

  return (
    <ErrorUI>
      <Typography variant="body1" color="text.secondary">
        Oops, we couldn’t fetch your challenge list from Codewars. If you’ve
        changed your username on Codewars, click &apos;Reconnect&apos;
        Otherwise, it’s likely a network issue—please check your connection and
        try again!
      </Typography>
      <ErrorButtonContainer>
        <Button
          variant="outlined"
          color="primary"
          onClick={() => handleTry(currentUser, pageNumber, dispatch)}
        >
          Try Again
        </Button>
        <Link href="/wars/validation/steps/1" replace>
          <Button variant="contained" color="secondary">
            Reconnect
          </Button>
        </Link>
      </ErrorButtonContainer>
    </ErrorUI>
  );
};

export default Error;
