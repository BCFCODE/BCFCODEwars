import CodewarsProvider from "@/app/context/providers/codewars/CodewarsProvider";
import { CodewarsCompletedChallenge } from "@/types/codewars";
import React from "react";
import CodewarsTable from "./Tables/CompletedChallenges";
import Head from "./Tables/CompletedChallenges/Head";
import Body from "./Tables/CompletedChallenges/Body";
import { Box, Table } from "@mui/material";

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
        <CodewarsTable {...{ handleRetry, error, isLoading }} />
      </Box>
    </CodewarsProvider>
  );
};

export default CodewarsSection;
