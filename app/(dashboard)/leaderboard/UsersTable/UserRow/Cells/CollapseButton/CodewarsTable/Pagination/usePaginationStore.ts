import { PERSIST_KEYS } from "@/app/context/store/storeKeys";
import { create } from "zustand";
import { persist } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";

export interface Pagination {
  page: number;
  rowsPerPage: number;
  apiPageNumber: number;
}

interface PaginationStore {
  // paginationQuery: PaginationQuery;
  pagination: Pagination;
  setPage: (page: number) => void;
  setRowsPerPage: (rowsPerPage: number) => void;
  // setPaginationQuery: (query: PaginationQuery) => void;
  isLoading: boolean;
  setIsLoading: (isLoading: boolean) => void;
}

export const usePaginationStore = create<PaginationStore>()(
  persist(
    immer((set) => ({
      pagination: { page: 0, rowsPerPage: 10, apiPageNumber: 0 },
      setPage: (page) =>
        set((state) => {
          state.pagination.page = page;
        }),
      setRowsPerPage: (rowsPerPage) =>
        set((state) => {
          state.pagination.rowsPerPage = rowsPerPage;
        }),
      // paginationQuery: { skip: 0, limit: 10 },
      // setPaginationQuery: (paginationQuery) =>
      //   set((state) => {
      //     state.paginationQuery = paginationQuery;
      //   }),
      isLoading: true,
      setIsLoading: (isLoading) =>
        set((state) => {
          state.isLoading = isLoading;
        }),
    })),
    {
      name: PERSIST_KEYS.codewarsTablePaginationQuery,
      partialize: (state) => ({}),
      onRehydrateStorage: () => (state) => {
        state?.setIsLoading(false);
      },
    }
  )
);

export default usePaginationStore;
