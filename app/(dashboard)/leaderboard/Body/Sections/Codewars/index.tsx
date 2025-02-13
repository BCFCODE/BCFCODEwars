import { Box } from "@mui/material";
import CompletedChallengesTable from "./Tables/CompletedChallenges";

const CodewarsSection = () => {
  return (
    <Box sx={{ margin: 1 }}>
      <CompletedChallengesTable />
    </Box>
  );
};

export default CodewarsSection;
