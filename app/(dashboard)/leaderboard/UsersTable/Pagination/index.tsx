import TablePagination from "@mui/material/TablePagination";
import * as React from "react";
import usePaginationStore from "../context/store/usePaginationStore";
import Loading from "./Loading";

interface Props {
  totalPageCount: number | undefined;
}

export default function Pagination({ totalPageCount }: Props) {
  const {
    page,
    setPage,
    rowsPerPage,
    setRowsPerPage,
    setPaginationQuery,
    isLoading,
  } = usePaginationStore((state) => state);

  const getNewQueryAndSetPaginationQuery = (
    page: number,
    rowsPerPage: number
  ) => {
    const skip = page * rowsPerPage;
    const limit = rowsPerPage;
    setPaginationQuery({ skip, limit });
  };

  // React.useEffect(() => {
  //   onPaginationQueryChange({ skip, limit });
  // }, [page, rowsPerPage]);

  const handleChangePage = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) => {
    setPage(newPage);
    getNewQueryAndSetPaginationQuery(newPage, rowsPerPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const [page, rowsPerPage] = [0, parseInt(event.target.value, 10)];
    setPage(page);
    setRowsPerPage(rowsPerPage);
    getNewQueryAndSetPaginationQuery(0, rowsPerPage);
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
          labelRowsPerPage=''
        />
      )}
    </>
  );
}
