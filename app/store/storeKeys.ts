interface PersistKeys {
  dailyTarget: string;
  usersPaginationQuery: string;
  codewarsTablePaginationQuery: string;
  users: string;
  codewars: string;
  collectButton: string;
}

export const PERSIST_KEYS: PersistKeys = {
  dailyTarget: "zustand:daily-target",
  usersPaginationQuery: "zustand:users-pagination-query",
  codewarsTablePaginationQuery: "zustand:codewars-table-pagination-query",
  users: "zustand:users",
  codewars: "zustand:codewars",
  collectButton: "zustand:collect-diamonds-button",
};
