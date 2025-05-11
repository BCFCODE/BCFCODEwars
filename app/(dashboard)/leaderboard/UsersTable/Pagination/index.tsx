import TablePagination from "@mui/material/TablePagination";
import * as React from "react";
import usePaginationStore from "./usePaginationStore";
import Loading from "./Loading";
import createPaginatedQuery from "../utils/createPaginatedQuery";

interface Props {
  totalPageCount: number | undefined;
}

export default function Pagination({ totalPageCount }: Props) {
  const {
    pagination: { page, rowsPerPage },
    setPage,
    setRowsPerPage,
    setPaginationQuery,
    isLoading,
  } = usePaginationStore((state) => state);

  const handleChangePage = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) => {
    setPage(newPage);
    const pagination = createPaginatedQuery({
      page: newPage,
      rowsPerPage,
    });
    setPaginationQuery(pagination);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const [page, rowsPerPage] = [0, parseInt(event.target.value, 10)];
    setPage(page);
    setRowsPerPage(rowsPerPage);
    const pagination = createPaginatedQuery({ page: 0, rowsPerPage });
    setPaginationQuery(pagination);
  };

  return (
    <>
      {isLoading ? (
        <Loading message="Loading..." />
      ) : (
        <TablePagination
          component="div"
          count={totalPageCount ?? 100}
          page={page}
          onPageChange={handleChangePage}
          rowsPerPage={rowsPerPage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          labelRowsPerPage=""
        />
      )}
    </>
  );
}
