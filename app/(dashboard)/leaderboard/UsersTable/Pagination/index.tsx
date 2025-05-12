import TablePagination from "@mui/material/TablePagination";
import * as React from "react";
import Loading from "./Loading";
import usePaginationStore from "./usePaginationStore";

interface Props {
  totalPageCount: number | undefined;
}

export default function Pagination({ totalPageCount }: Props) {
  const {
    pagination: { page, rowsPerPage },
    setPagination,
    isLoading,
  } = usePaginationStore((state) => state);

  const handleChangePage = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) => {
    const newQuery = { page: newPage, rowsPerPage };
    setPagination(newQuery);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const newQuery = { page: 0, rowsPerPage: parseInt(event.target.value, 10) };
    setPagination(newQuery);
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
