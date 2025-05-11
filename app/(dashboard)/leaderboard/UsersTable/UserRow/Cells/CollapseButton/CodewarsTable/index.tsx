import LoadingUI from "@/app/components/UI/LoadingUI";
import useCurrentUserContext from "@/app/context/hooks/db/useCurrentUserContext";
import { Box, Table } from "@mui/material";
import Body from "./Body";
import Error from "./Error";
import Head from "./Head";
import Pagination from "./Pagination";
import useCodewarsListQuery from "./Pagination/useCodewarsListQuery";

const CodewarsTable = () => {
  const { currentUser } = useCurrentUserContext();

  const { isError, isLoading, data } = useCodewarsListQuery({
    username: currentUser.codewars.username,
  });

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
        <Pagination totalPageCount={data?.totalItems} />
      </Box>
    </Box>
  );
};

export default CodewarsTable;
