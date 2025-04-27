import { Box, Table } from "@mui/material";
import LoadingUI from "@/app/components/UI/LoadingUI";
import useCodewarsContext from "@/app/context/hooks/codewars/useCodewarsContext";
import Head from "./Head";
import Body from "./Body";
import Error from "./Error";

const CodewarsTable = () => {
  const { isError, isLoading } = useCodewarsContext();

  if (isError) return <Error />;

  if (isLoading)
    return (
      <LoadingUI
        title="Loading Challenges"
        message="Retrieving data from Codewars. Please wait..."
      />
    );

  return (
    <Box sx={{ margin: 1 }}>
      <Table size="small" aria-label="completed challenges">
        <Head />
        <Body />
      </Table>
    </Box>
  );
};

export default CodewarsTable;
