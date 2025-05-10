import { PaginationQuery } from "@/app/services/db";
import { PERSIST_KEYS } from "@/app/context/store/storeKeys";
import { create } from "zustand";
import { persist } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";

export interface Pagination {
  page: number;
  rowsPerPage: number;
  usersCount: number;
}

interface PaginationStore {
  pagination: Pagination;
  setPage: (page: number) => void;
  setRowsPerPage: (rowsPerPage: number) => void;
  setUsersCount: (totalUsers: number) => void;
  paginationQuery: PaginationQuery;
  setPaginationQuery: (query: PaginationQuery) => void;
  isLoading: boolean;
  setIsLoading: (isLoading: boolean) => void;
}

export const usePaginationStore = create<PaginationStore>()(
  persist(
    immer((set) => ({
      pagination: { page: 0, rowsPerPage: 10, usersCount: 0 },
      setPage: (page) =>
        set((state) => {
          state.pagination.page = page;
        }),
      setRowsPerPage: (rowsPerPage) =>
        set((state) => {
          state.pagination.rowsPerPage = rowsPerPage;
        }),
      setUsersCount: (totalUsers) =>
        set((state) => {
          state.pagination.usersCount = totalUsers;
        }),
      paginationQuery: { skip: 0, limit: 10 },
      setPaginationQuery: (paginationQuery) =>
        set((state) => {
          state.paginationQuery = paginationQuery;
        }),
      isLoading: true,
      setIsLoading: (isLoading) =>
        set((state) => {
          state.isLoading = isLoading;
        }),
    })),
    {
      name: PERSIST_KEYS.usersPaginationQuery,
      // partialize: (state) => ({ paginationQuery: state.paginationQuery }),
      onRehydrateStorage: () => (state) => {
        state?.setIsLoading(false);
      },
    }
  )
);

export default usePaginationStore;
