import ErrorButtonContainer from "@/app/components/UI/Error/Buttons/ButtonContainer";
import ErrorUI from "@/app/components/UI/Error/ErrorUI";
import { Button, Typography } from "@mui/material";

interface Props {
  onRetry: () => void;
}

const LeaderboardLoadingError = ({ onRetry }: Props) => {
  return (
    <ErrorUI>
      <Typography variant="body1" color="text.primary" gutterBottom>
        We encountered an issue while fetching user data.
      </Typography>
      <Typography variant="body2" color="text.secondary" gutterBottom>
        This could be due to:
      </Typography>
      <Typography
        variant="body2"
        component="ul"
        color="text.secondary"
        sx={{ pl: 2, textAlign: "left" }}
      >
        <li>A network connectivity problem.</li>
        <li>The server being temporarily unavailable.</li>
        <li>An unexpected error in our system.</li>
      </Typography>
      <Typography variant="body2" color="text.secondary" gutterBottom>
        What you can do:
      </Typography>
      <Typography
        variant="body2"
        component="ol"
        color="text.secondary"
        sx={{ pl: 2, textAlign: "left" }}
      >
        <li>Check your internet connection.</li>
        <li>Ensure the server is reachable.</li>
        <li>Try refreshing the page or clicking the retry button below.</li>
      </Typography>
      <Typography variant="body2" color="text.secondary">
        If the issue persists, please contact our support team for assistance.
      </Typography>
      <ErrorButtonContainer>
        <Button variant="outlined" color="primary" onClick={onRetry}>
          Try Again
        </Button>
      </ErrorButtonContainer>
    </ErrorUI>
  );
};

export default LeaderboardLoadingError;
