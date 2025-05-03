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
    }),
    {
      name: PERSIST_KEYS.paginationQuery,
      // partialize: (state) => ({ paginationQuery: state.paginationQuery }),
      // onRehydrateStorage: () => (state) => {
      //   if (state) {
      //     // state.setPage(state.page);
      //     // state.setRowsPerPage(state.rowsPerPage);
      //     console.log('onRehydrateStorage', state.page, state.rowsPerPage)
      //     const skip = state.page * state.rowsPerPage;
      //     const limit = skip + state.rowsPerPage;
      //     state.setPaginationQuery({ skip, limit });
      //   }
      // },
    }
  )
);

export default usePaginationStore;
