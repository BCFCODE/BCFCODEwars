import { PaginationQuery } from "@/app/services/db";
import { PERSIST_KEYS } from "@/app/store/storeKeys";
import { create } from "zustand";
import { persist } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";
import createPaginatedQuery from "@/app/(dashboard)/leaderboard/UsersTable/utils/createPaginatedQuery";

export const defaultPagination: PaginationQuery = {
  page: 0,
  rowsPerPage: 10,
  skip: 0,
  limit: 10,
  apiPageNumber: 0,
};

interface PaginationStore {
  pagination: Record<string, PaginationQuery>;
  setPagination: (
    username: string,
    query: { page: number; rowsPerPage: number }
  ) => void;
  isLoading: boolean;
  setIsLoading: (isLoading: boolean) => void;
  resetPagination: (username: string) => void;
}

export const usePaginationStore = create<PaginationStore>()(
  persist(
    immer((set) => ({
      pagination: {},
      isLoading: true,

      setPagination: (username, query) =>
        set((state) => {
          if (!state.pagination[username]) {
            state.pagination[username] = { ...defaultPagination };
          }

          const newQuery = {
            page: query.page,
            rowsPerPage: query.rowsPerPage,
          };

          Object.assign(
            state.pagination[username],
            createPaginatedQuery(newQuery)
          );
        }),

      resetPagination: (username) =>
        set((state) => {
          if (state.pagination[username]) {
            state.pagination[username] = { ...defaultPagination };
          }
        }),

      setIsLoading: (isLoading) =>
        set((state) => {
          state.isLoading = isLoading;
        }),
    })),
    {
      name: PERSIST_KEYS.codewarsTablePaginationQuery,
      partialize: (state) => ({
        pagination: Object.fromEntries(
          Object.entries(state.pagination).map(([username, query]) => [
            username,
            { ...defaultPagination, rowsPerPage: query.rowsPerPage },
          ])
        ),
      }),
      onRehydrateStorage: () => {
        return () => {
          usePaginationStore.getState().setIsLoading(false);
        };
      },
    }
  )
);

export default usePaginationStore;
