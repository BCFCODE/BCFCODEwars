import { PaginationQuery } from "@/app/services/db";
import TablePagination from "@mui/material/TablePagination";
import * as React from "react";

interface Props {
  onPaginationQueryChange: (paginationQuery: PaginationQuery) => void;
}

export default function Pagination({ onPaginationQueryChange }: Props) {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const skip = page * rowsPerPage;
  const limit = skip + rowsPerPage;

  React.useEffect(() => {
    onPaginationQueryChange({ skip, limit });
  }, [page, rowsPerPage]);

  const handleChangePage = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <TablePagination
      component="div"
      count={100}
      page={page}
      onPageChange={handleChangePage}
      rowsPerPage={rowsPerPage}
      onRowsPerPageChange={handleChangeRowsPerPage}
    />
  );
}
