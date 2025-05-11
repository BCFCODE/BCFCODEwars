import { Box, Table } from "@mui/material";
import LoadingUI from "@/app/components/UI/LoadingUI";
import useCodewarsContext from "@/app/context/hooks/codewars/useCodewarsContext";
import Head from "./Head";
import Body from "./Body";
import Error from "./Error";
import Pagination from "./Pagination";
import useCodewarsListQuery from "./Pagination/useCodewarsListQuery";
import { useUsersStore } from "@/app/context/store/users";

const CodewarsTable = () => {
  const { selectedUser } = useUsersStore((state) => state);

  const { pageNumber } = useCodewarsContext();

  const { isError, isLoading, data } = useCodewarsListQuery({
    pageNumber,
    username: selectedUser?.codewars.username ?? "",
  });

  console.log(
    "data?.totalItems >>>>",
    data?.totalItems,
    selectedUser?.codewars.username,
    selectedUser
  );

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
