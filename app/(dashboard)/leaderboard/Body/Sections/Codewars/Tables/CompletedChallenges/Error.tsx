import ErrorButtonContainer from "@/app/components/UI/Error/Buttons/ButtonContainer";
import ErrorUI from "@/app/components/UI/Error/ErrorUI";
import { Button, Typography } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import Link from "next/link";
import useChallengeList from "../../../Collapse/hooks/useDiffAndUpdateList";

const Error = () => {
  const {
    fetchAndShowChallenges,
    tryAgain: { isError, isLoading },
  } = useChallengeList();

  return (
    <ErrorUI>
      <Typography variant="body1" color="text.secondary">
        We couldn’t fetch your challenge list from Codewars. This might be due
        to a network issue or a temporary error on Codewars’ end.
        <br />
        If you’ve recently changed your username or deleted your account, try
        reconnecting.
        <Typography
          component="span"
          sx={{
            fontWeight: "bold",
            color: "error.main",
            display: "block",
            mt: 1,
          }}
        >
          ⚠️ Reconnecting will erase your current data and replace it with new
          information from Codewars. Proceed with caution.
        </Typography>
      </Typography>

      <ErrorButtonContainer>
        <LoadingButton
          variant="outlined"
          color={isError ? "error" : "primary"}
          onClick={fetchAndShowChallenges}
          loading={isLoading}
          loadingIndicator="Loading..."
          disabled={isLoading}
          sx={{
            animation: isLoading ? "pulse 1.6s ease-in-out infinite" : "none",
            "@keyframes pulse": {
              "0%": { boxShadow: "0 0 0 0 rgba(25, 118, 210, 0.4)" },
              "70%": { boxShadow: "0 0 0 10px rgba(25, 118, 210, 0)" },
              "100%": { boxShadow: "0 0 0 0 rgba(25, 118, 210, 0)" },
            },
          }}
        >
          Try Again
        </LoadingButton>

        <Link href="/wars" replace>
          <Button variant="contained" color="secondary">
            Reconnect
          </Button>
        </Link>
      </ErrorButtonContainer>
    </ErrorUI>
  );
};

export default Error;
