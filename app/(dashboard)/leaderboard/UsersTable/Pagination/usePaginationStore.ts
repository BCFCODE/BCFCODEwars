import { PaginationQuery } from "@/app/services/db";
import { PERSIST_KEYS } from "@/app/store/storeKeys";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface PaginationStore {
  paginationQuery: PaginationQuery;
  setPaginationQuery: (query: PaginationQuery) => void;
  page: number;
  setPage: (page: number) => void;
  rowsPerPage: number;
  setRowsPerPage: (rowsPerPage: number) => void;
  isLoading: boolean;
  setIsLoading: (isLoading: boolean) => void;
}

export const usePaginationStore = create<PaginationStore>()(
  persist(
    (set) => ({
      paginationQuery: { skip: 0, limit: 10 },
      setPaginationQuery: (paginationQuery) => set(() => ({ paginationQuery })),
      page: 0,
      setPage: (page) => set(() => ({ page })),
      rowsPerPage: 10,
      setRowsPerPage: (rowsPerPage) => set(() => ({ rowsPerPage })),
      isLoading: true,
      setIsLoading: (isLoading) => set(() => ({ isLoading })),
    }),
    {
      name: PERSIST_KEYS.usersPaginationQuery,
      // partialize: (state) => ({ paginationQuery: state.paginationQuery }),
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
