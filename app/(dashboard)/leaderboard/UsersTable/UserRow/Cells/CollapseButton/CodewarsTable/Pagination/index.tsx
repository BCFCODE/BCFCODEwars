import TablePagination from "@mui/material/TablePagination";
import * as React from "react";
import usePaginationStore from "./usePaginationStore";
import createPaginatedQuery from "@/app/(dashboard)/leaderboard/UsersTable/utils/createPaginatedQuery";

interface Props {
  totalPageCount: number | undefined;
}

export default function Pagination({ totalPageCount = 0 }: Props) {
  const {
    setPaginationQuery,
    isLoading,
    pagination: { page, rowsPerPage },
  } = usePaginationStore((state) => state);

  console.log(">>>>>>>", page, rowsPerPage, isLoading);

  const handleChangePage = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) => {
    const newQuery = { page: newPage, rowsPerPage };
    setPaginationQuery(newQuery);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const newQuery = { page: 0, rowsPerPage: parseInt(event.target.value, 10) };
    setPaginationQuery(newQuery);
  };

  return (
    <>
      <TablePagination
        component="div"
        count={totalPageCount}
        page={page}
        onPageChange={handleChangePage}
        rowsPerPage={rowsPerPage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        labelRowsPerPage=""
      />
    </>
  );
}
