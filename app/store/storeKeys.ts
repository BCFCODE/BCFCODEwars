interface PersistKeys {
  dailyTarget: string;
  paginationQuery: string;
}

export const PERSIST_KEYS: PersistKeys = {
  dailyTarget: "zustand:daily-target",
  paginationQuery: "zustand:pagination-query",
};
