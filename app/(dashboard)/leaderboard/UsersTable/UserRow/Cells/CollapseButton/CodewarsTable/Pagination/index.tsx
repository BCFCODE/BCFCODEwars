import TablePagination from "@mui/material/TablePagination";
import * as React from "react";
import usePaginationStore from "./usePaginationStore";

interface Props {
  totalPageCount: number | undefined;
}

export default function Pagination({ totalPageCount = 0 }: Props) {
  const {
    pagination: { page, rowsPerPage },
    setPagination,
  } = usePaginationStore((state) => state);

  // console.log(">>>>>>>", page, rowsPerPage, isLoading);

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
