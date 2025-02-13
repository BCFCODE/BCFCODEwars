import LoadingUI from "@/app/components/UI/LoadingUI";
import useCodewarsContext from "@/app/context/hooks/useContexts/useCodewarsContext";
import { Table } from "@mui/material";
import Body from "./Body";
import Error from "./Error";
import Head from "./Head";

const CompletedChallengesTable = () => {
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
    <Table size="small" aria-label="completed challenges">
      <Head />
      <Body />
    </Table>
  );
};

export default CompletedChallengesTable;
