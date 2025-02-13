import { Box } from "@mui/material";
import CompletedChallengesTable from "./Tables/CompletedChallenges";

interface Props {
  handleRetry: () => void;
  error: boolean;
  isLoading: boolean;
}

const CodewarsSection = ({ handleRetry, error, isLoading }: Props) => {
  return (
    <Box sx={{ margin: 1 }}>
      <CompletedChallengesTable {...{ handleRetry, error, isLoading }} />
    </Box>
  );
};

export default CodewarsSection;
