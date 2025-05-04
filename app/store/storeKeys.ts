interface PersistKeys {
  dailyTarget: string;
  paginationQuery: string;
  codewarsGauges: string;
}

export const PERSIST_KEYS: PersistKeys = {
  dailyTarget: "zustand:daily-target",
  paginationQuery: "zustand:pagination-query",
  codewarsGauges: "zustand:codewars-gauges",
};
