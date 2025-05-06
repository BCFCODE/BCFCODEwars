// import { PERSIST_KEYS } from "@/app/store/storeKeys";
// import { CodewarsCompletedChallenge } from "@/types/codewars";
// import { create } from "zustand";
// import { persist } from "zustand/middleware";

// interface GaugeStore {
//   list: CodewarsCompletedChallenge[];
//   setList: (list: CodewarsCompletedChallenge[]) => void;
// }

// const useGaugeStore = create<GaugeStore>()(
//   persist(
//     (set) => ({
//       list: [] as CodewarsCompletedChallenge[],
//       setList: (list) => set({ list }),
//     }),
//     {
//       name: PERSIST_KEYS.codewarsGauges,
//       partialize: (state) => ({}),
//     }
//   )
// );

// export default useGaugeStore;
