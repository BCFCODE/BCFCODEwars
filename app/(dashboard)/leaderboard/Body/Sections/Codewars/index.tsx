import CodewarsProvider from "@/app/context/providers/codewars/CodewarsProvider";
import { CodewarsCompletedChallenge } from "@/types/codewars";
import { Box } from "@mui/material";
import CompletedChallengesTable from "./Tables/CompletedChallenges";

interface Props {
  completedChallenges?: CodewarsCompletedChallenge[];
  handleRetry: () => void;
  error: boolean;
  isLoading: boolean;
}

const CodewarsSection = ({
  completedChallenges,
  handleRetry,
  error,
  isLoading,
}: Props) => {
  return (
    <CodewarsProvider context={{ completedChallenges }}>
      <Box sx={{ margin: 1 }}>
        <CompletedChallengesTable {...{ handleRetry, error, isLoading }} />
      </Box>
    </CodewarsProvider>
  );
};

export default CodewarsSection;
