import LoadingUI from "@/app/components/UI/LoadingUI";
import { Box, Table, Typography } from "@mui/material";
import Error from "./Error";
import Body from "./Body";
import { Head } from "./Head";
import { ReactNode } from "react";

interface Props {
  error: boolean;
  isLoading: boolean;
  handleRetry: () => void;
  children: ReactNode;
}

const CodewarsTable = ({ handleRetry, error, isLoading, children }: Props) => {
  return (
    <Box sx={{ margin: 1 }}>
      <Typography variant="h6" gutterBottom component="div">
        Codewars Completed Challenges
      </Typography>
      {error ? (
        <Error onRetry={handleRetry} />
      ) : isLoading ? (
        <LoadingUI
          title="Loading Challenges"
          message="Retrieving data from Codewars. Please wait..."
        />
      ) : (
        <Table size="small" aria-label="completed challenges">
          <Head />
          <Body />
          {children}
        </Table>
      )}
    </Box>
  );
};

export default CodewarsTable;
