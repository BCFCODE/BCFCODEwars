interface PersistKeys {
  dailyTarget: string;
  pagination: string;
  codewarsGauges: string;
}

export const PERSIST_KEYS: PersistKeys = {
  dailyTarget: "zustand:daily-target",
  pagination: "zustand:pagination-query",
  codewarsGauges: "zustand:codewars-gauges",
};
