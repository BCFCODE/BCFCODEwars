import { PERSIST_KEYS } from "@/app/store/storeKeys";
import { CodewarsCompletedChallenge } from "@/types/codewars";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface GaugeStore {
  list: CodewarsCompletedChallenge[];
  setList: (list: CodewarsCompletedChallenge[]) => void;
  // percents: number[];
  // setPercents: (percents: number[]) => void;
}

const useGaugeStore = create<GaugeStore>()(
  persist(
    (set) => ({
      list: [] as CodewarsCompletedChallenge[],
      setList: (list) => set({ list }),
      // percents: [0, 0, 0, 0],
      // setPercents: (percents) => set({ percents }),
    }),
    {
      name: PERSIST_KEYS.codewarsGauges,
      partialize: (state) => ({}),
    }
  )
);

export default useGaugeStore;
