import { PaginationQuery } from "@/app/services/db";
import { PERSIST_KEYS } from "@/app/context/store/storeKeys";
import { create } from "zustand";
import { persist } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";

interface PaginationStore {
  pagination: PaginationQuery;
  setPaginationQuery: (query: PaginationQuery) => void;
  setPage: (page: number) => void;
  setRowsPerPage: (rowsPerPage: number) => void;
  isLoading: boolean;
  setIsLoading: (isLoading: boolean) => void;
}

export const usePaginationStore = create<PaginationStore>()(
  persist(
    immer((set) => ({
      pagination: {
        page: 0,
        rowsPerPage: 10,
        skip: 0,
        limit: 10,
        apiPageNumber: 0,
      },
      setPaginationQuery: (pagination) =>
        set((state) => {
          state.pagination = pagination;
        }),

      setPage: (page) =>
        set((state) => {
          state.pagination.page = page;
        }),
      setRowsPerPage: (rowsPerPage) =>
        set((state) => {
          state.pagination.rowsPerPage = rowsPerPage;
        }),
      isLoading: true,
      setIsLoading: (isLoading) => set(() => ({ isLoading })),
    })),
    {
      name: PERSIST_KEYS.codewarsTablePaginationQuery,
      // partialize: (state) => ({ pagination: state.pagination }),
      onRehydrateStorage: () => (state) => {
        state?.setIsLoading(false);
      },
    }
  )
);

usePaginationStore.getState().setIsLoading = (isLoading: boolean) => {
  usePaginationStore.setState({ isLoading });
};

export default usePaginationStore;
