import LoadingUI from "@/app/components/UI/LoadingUI";
import { Box, Table, Typography } from "@mui/material";
import { ReactNode } from "react";
import Error from "./Error";
import Head from "./Head";
import Body from "./Body";

interface Props {
  error: boolean;
  isLoading: boolean;
  handleRetry: () => void;
}

const CompletedChallengesTable = ({ handleRetry, error, isLoading }: Props) => {
  if (error) return <Error onRetry={handleRetry} />;

  if (isLoading)
    return (
      <LoadingUI
        title="Loading Challenges"
        message="Retrieving data from Codewars. Please wait..."
      />
    );

  return (
    <Table size="small" aria-label="completed challenges">
      <Head />
      <Body />
    </Table>
  );
};

export default CompletedChallengesTable;
