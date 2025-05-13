import TablePagination from "@mui/material/TablePagination";
import * as React from "react";
import usePaginationStore, { defaultPagination } from "./usePaginationStore";
import useCurrentUserContext from "@/app/context/hooks/db/useCurrentUserContext";

interface Props {
  totalPageCount: number | undefined;
}

export default function Pagination({ totalPageCount = 0 }: Props) {
  const { currentUser } = useCurrentUserContext();

  const username = currentUser.codewars.username;
  const pagination = usePaginationStore(
    (state) => state.pagination[username] ?? defaultPagination
  );
  const setPagination = usePaginationStore((state) => state.setPagination);

  const handleChangePage = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) => {
    setPagination(username, {
      page: newPage,
      rowsPerPage: pagination.rowsPerPage,
    });
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setPagination(username, {
      page: 0,
      rowsPerPage: parseInt(event.target.value, 10),
    });
  };

  return (
    <>
      <TablePagination
        component="div"
        count={totalPageCount}
        page={pagination.page}
        onPageChange={handleChangePage}
        rowsPerPage={pagination.rowsPerPage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        labelRowsPerPage=""
      />
    </>
  );
}
