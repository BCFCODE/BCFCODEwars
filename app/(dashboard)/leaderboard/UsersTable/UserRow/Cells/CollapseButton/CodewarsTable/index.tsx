import LoadingUI from "@/app/components/UI/LoadingUI";
import { Box, Table } from "@mui/material";
import useListQuery from "../hooks/ReactQuery/useListQuery";
import Body from "./Body";
import Error from "./Error";
import Head from "./Head";
import Pagination from "./Pagination";

const CodewarsTable = () => {
  const { isError, isLoading, data } = useListQuery();

  // console.log(
  //   "data?.totalItems >>>>",
  //   data?.totalItems,
  //   selectedUser?.codewars.username,
  //   selectedUser
  // );

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
      {/* <CodewarsTargetGauges /> */}
      <Table size="small" aria-label="completed challenges">
        <Head />
        <Body />
      </Table>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Pagination totalItems={data?.totalItems} />
      </Box>
    </Box>
  );
};

export default CodewarsTable;
