import LoadingUI from "@/app/components/UI/LoadingUI";
import { Box, Table, Typography } from "@mui/material";
import { error } from "console";
import Error from "./Error";
import CodewarsCompletedChallengesTableBody from "./TableBody";
import { CodewarsCompletedChallengesTableHead } from "./TableHead";

interface Props {
  error: boolean;
  isLoading: boolean;
  handleReconnect: () => void;
  handleRetry: () => void;
}

const CodewarsCompletedChallengesTable = ({
  handleReconnect,
  handleRetry,
  error,
  isLoading,
}: Props) => {
  return (
    <Box sx={{ margin: 1 }}>
      <Typography variant="h6" gutterBottom component="div">
        Codewars Completed Challenges
      </Typography>
      {error ? (
        <Error onRetry={handleRetry} onReconnect={handleReconnect} />
      ) : isLoading ? (
        <LoadingUI
          title="Loading Challenges"
          message="Retrieving data from Codewars. Please wait..."
        />
      ) : (
        <Table size="small" aria-label="completed challenges">
          <CodewarsCompletedChallengesTableHead />
          <CodewarsCompletedChallengesTableBody />
        </Table>
      )}
    </Box>
  );
};

export default CodewarsCompletedChallengesTable;
