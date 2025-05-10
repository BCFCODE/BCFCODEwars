import TablePagination from "@mui/material/TablePagination";
import * as React from "react";
import usePaginationStore from "./usePaginationStore";
import setQuerySkipAndLimit from "@/app/(dashboard)/leaderboard/UsersTable/utils/setQuerySkipAndLimit";

interface Props {
  totalItems: number | undefined;
}

export default function Pagination({ totalItems = 0 }: Props) {
  const {
    pagination: { page, rowsPerPage },
    setPage,
    setRowsPerPage,
    // setPaginationQuery,
    isLoading,
    // paginationQuery,
  } = usePaginationStore((state) => state);

  // console.log(">>>>>>>", page, rowsPerPage, paginationQuery, isLoading);

  const handleChangePage = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) => {
    setPage(newPage);
    const newQuery = { page: newPage, rowsPerPage };
    // const paginationQuery = setQuerySkipAndLimit(newQuery);
    // setPaginationQuery(paginationQuery);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const [page, rowsPerPage] = [0, parseInt(event.target.value, 10)];
    setPage(page);
    setRowsPerPage(rowsPerPage);
    const newQuery = { page: 0, rowsPerPage };
    // const paginationQuery = setQuerySkipAndLimit(newQuery);
    // setPaginationQuery(paginationQuery);
  };

  return (
    <>
      <TablePagination
        component="div"
        count={totalItems}
        page={page}
        onPageChange={handleChangePage}
        rowsPerPage={rowsPerPage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        labelRowsPerPage=""
      />
    </>
  );
}
