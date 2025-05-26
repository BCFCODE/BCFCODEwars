import { CodewarsCompletedChallenge } from "@/types/codewars";
import { create } from "zustand";
import { persist } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";
import { PERSIST_KEYS } from "./storeKeys";

type Store = {
  challenge: {
    selectedChallenge?: CodewarsCompletedChallenge;
  };
  setSelectedChallenge: (selectedChallenge: CodewarsCompletedChallenge) => void;
};

export const useCodewarsStore = create<Store>()(
  persist(
    immer((set) => ({
      challenge: {},
      setSelectedChallenge: (selectedChallenge) =>
        set((state) => {
          state.challenge.selectedChallenge = selectedChallenge;
        }),
    })),
    {
      name: PERSIST_KEYS.codewars,
      partialize: (state) => ({}),
    }
  )
);
