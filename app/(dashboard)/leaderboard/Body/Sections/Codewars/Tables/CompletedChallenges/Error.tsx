import ErrorButtonContainer from "@/app/components/UI/Error/Buttons/ButtonContainer";
import ErrorUI from "@/app/components/UI/Error/ErrorUI";
import { Button, Typography } from "@mui/material";
import Link from "next/link";
import useChallengeList from "../../../Collapse/hooks/useChallengeList";

const Error = () => {
  const { buildChallengeList } = useChallengeList();

  return (
    <ErrorUI>
      <Typography variant="body1" color="text.secondary">
        Oops, we couldn’t fetch your challenge list from Codewars. If you’ve
        changed your username on Codewars, click &apos;Reconnect&apos;
        Otherwise, it’s likely a network issue—please check your connection and
        try again!
      </Typography>
      <ErrorButtonContainer>
        <Button variant="outlined" color="primary" onClick={buildChallengeList}>
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
