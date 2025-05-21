import ErrorButtonContainer from "@/app/components/UI/Error/Buttons/ButtonContainer";
import ErrorUI from "@/app/components/UI/Error/ErrorUI";
import { Button, Typography } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import Link from "next/link";
import useChallengeList from "../hooks/useDiffAndUpdateList";
import usePaginationQuery from "./Pagination/usePaginationQuery";

const Error = () => {
  const { isError, isLoading, refetch, isFetching, error } =
    usePaginationQuery();
  // const {
  //   fetchAndShowChallenges,
  //   tryAgain: { isError, isLoading },
  // } = useChallengeList();

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
          color={
            isLoading || isFetching
              ? "secondary"
              : isError || error
                ? "error"
                : "primary"
          }
          onClick={() => refetch()}
          loading={isLoading}
          loadingIndicator="Loading..."
          disabled={isLoading}
          sx={{
            width: 150,
            animation:
              isLoading || isFetching
                ? "pulse 1.6s ease-in-out infinite"
                : "none",
            "@keyframes pulse": {
              "0%": { boxShadow: "0 0 0 0 rgba(25, 118, 210, 0.4)" },
              "70%": { boxShadow: "0 0 0 10px rgba(25, 118, 210, 0)" },
              "100%": { boxShadow: "0 0 0 0 rgba(25, 118, 210, 0)" },
            },
          }}
        >
          {isLoading || isFetching ? `Loading` : `Try Again`}
        </LoadingButton>

        <Link href="/wars" replace>
          <Button sx={{ width: 150 }} variant="outlined" color="error">
            Reconnect
          </Button>
        </Link>
      </ErrorButtonContainer>
    </ErrorUI>
  );
};

export default Error;
