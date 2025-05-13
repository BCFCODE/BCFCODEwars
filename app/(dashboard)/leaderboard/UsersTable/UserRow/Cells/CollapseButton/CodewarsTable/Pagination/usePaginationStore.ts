import { PaginationQuery } from "@/app/services/db";
import { PERSIST_KEYS } from "@/app/context/store/storeKeys";
import { create } from "zustand";
import { persist } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";
import createPaginatedQuery from "@/app/(dashboard)/leaderboard/UsersTable/utils/createPaginatedQuery";

interface PaginationStore {
  pagination: PaginationQuery;
  setPagination: (query: { page: number; rowsPerPage: number }) => void;
  isLoading: boolean;
  setIsLoading: (isLoading: boolean) => void;
  resetPagination: () => void;
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
      setPagination: (query) =>
        set((state) => {
          const newQuery = { page: query.page, rowsPerPage: query.rowsPerPage };
          Object.assign(state.pagination, {
            ...createPaginatedQuery(newQuery),
          });
        }),
      resetPagination: () =>
        set((state) => {
          state.pagination = {
            page: 0,
            rowsPerPage: 10,
            skip: 0,
            limit: 10,
            apiPageNumber: 0,
          };
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
