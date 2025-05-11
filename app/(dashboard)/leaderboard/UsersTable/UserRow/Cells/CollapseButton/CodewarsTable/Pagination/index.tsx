import TablePagination from "@mui/material/TablePagination";
import * as React from "react";
import usePaginationStore from "./usePaginationStore";
import createPaginatedQuery from "@/app/(dashboard)/leaderboard/UsersTable/utils/createPaginatedQuery";

interface Props {
  totalPageCount: number | undefined;
}

export default function Pagination({ totalPageCount = 0 }: Props) {
  const {
    setPage,
    setRowsPerPage,
    setPaginationQuery,
    isLoading,
    pagination: { page, rowsPerPage },
  } = usePaginationStore((state) => state);

  console.log(">>>>>>>", page, rowsPerPage, isLoading);

  const handleChangePage = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) => {
    setPage(newPage);
    const newQuery = { page: newPage, rowsPerPage };
    const pagination = createPaginatedQuery(newQuery);
    setPaginationQuery(pagination);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const [page, rowsPerPage] = [0, parseInt(event.target.value, 10)];
    setPage(page);
    setRowsPerPage(rowsPerPage);
    const newQuery = { page: 0, rowsPerPage };
    const pagination = createPaginatedQuery(newQuery);
    setPaginationQuery(pagination);
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
