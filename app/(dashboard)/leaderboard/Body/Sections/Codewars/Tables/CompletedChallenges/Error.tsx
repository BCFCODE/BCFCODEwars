import ErrorButtonContainer from "@/app/components/UI/Error/Buttons/ButtonContainer";
import ErrorUI from "@/app/components/UI/Error/ErrorUI";
import useCodewarsContext from "@/app/context/hooks/codewars/useCodewarsContext";
import useDBCurrentUserContext from "@/app/context/hooks/db/useDBCurrentUserContext";
import useCodewarsDispatchContext from "@/app/context/hooks/codewars/useCodewarsDispatchContext";
import { Button, Typography } from "@mui/material";
import Link from "next/link";
import fetchCompletedChallenges from "../../../Collapse/fetchCompletedChallenges";

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
          onClick={() =>
            fetchCompletedChallenges(currentUser, pageNumber, dispatch)
          }
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
