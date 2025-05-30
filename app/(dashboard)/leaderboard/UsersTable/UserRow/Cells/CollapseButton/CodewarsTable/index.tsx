import LoadingUI from "@/app/components/UI/LoadingUI";
import { useUsersStore } from "@/app/store/users";
import { Box, Table } from "@mui/material";
import Body from "./Body";
import Error from "./Error";
import Head from "./Head";
import Pagination from "./Pagination";
import usePaginationQuery from "./Pagination/usePaginationQuery";
import useCurrentUserContext from "@/app/context/hooks/useCurrentUserContext";

const CodewarsTable = () => {
  const { currentUser } = useCurrentUserContext();
  const selectedUser = useUsersStore((state) => state.user.selectedUser);
  const { isError, isLoading, data, error } = usePaginationQuery();

  if (isError || (error && currentUser.email === selectedUser?.email))
    return <Error />;

  if (isLoading && currentUser.email === selectedUser?.email)
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
