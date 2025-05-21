import TablePagination from "@mui/material/TablePagination";
import * as React from "react";
import Loading from "../../UI/Loading";
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
    setPagination({ page: newPage, rowsPerPage });
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setPagination({ page: 0, rowsPerPage: parseInt(event.target.value, 10) });
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
