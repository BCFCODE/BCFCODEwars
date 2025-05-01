import { Box, Table } from "@mui/material";
import LoadingUI from "@/app/components/UI/LoadingUI";
import useCodewarsContext from "@/app/context/hooks/codewars/useCodewarsContext";
import Head from "./Head";
import Body from "./Body";
import Error from "./Error";
import DailyTargetGauges from "@/app/(dashboard)/Stats/Gauge/DailyTargetGauges";
// import Pagination from "./Pagination";

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
    <Box
      sx={{
        margin: 1,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      {/* <DailyTargetGauges /> */}
      <Table size="small" aria-label="completed challenges">
        <Head />
        <Body />
      </Table>
      {/* <Pagination /> */}
    </Box>
  );
};

export default CodewarsTable;
