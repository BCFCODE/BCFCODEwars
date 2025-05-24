import { create } from "zustand";
import { persist } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";
import { PERSIST_KEYS } from "./storeKeys";
import { CodewarsCompletedChallenge } from "@/types/codewars";

type Store = {
  challenge: {
    selectedChallenge?: CodewarsCompletedChallenge;
  };
  setSelectedChallenge: (selectedChallenge: CodewarsCompletedChallenge) => void;
  // setIsCollapsed: (username: string, isCollapsed: boolean) => void;
  // checkUntrackedChallengesAvailability: (
  //   email: string,
  //   untrackedChallengesAvailable: boolean
  // ) => void;
};

export const useCodewarsStore = create<Store>()(
  persist(
    immer((set) => ({
      challenge: {},
      setSelectedChallenge: (selectedChallenge) =>
        set((state) => {
          state.challenge.selectedChallenge = selectedChallenge;
        }),
      // setIsCollapsed: (email, isCollapsed) =>
      //   set((state) => {
      //     if (state.user.selectedUser)
      //       state.user.isCollapsed[email] = isCollapsed;
      //   }),
      // checkUntrackedChallengesAvailability: (
      //   email,
      //   untrackedChallengesAvailable
      // ) =>
      //   set((state) => {
      //     if (state.user.untrackedChallengesAvailable)
      //       state.user.untrackedChallengesAvailable[email] =
      //         untrackedChallengesAvailable;
      //   }),
    })),
    {
      name: PERSIST_KEYS.codewars,
      partialize: (state) => ({}),
    }
  )
);
