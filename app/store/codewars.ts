import { CodewarsCompletedChallenge } from "@/types/codewars";
import { create } from "zustand";
import { persist } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";
import { PERSIST_KEYS } from "./storeKeys";

type Store = {
  challenge: {
    selectedChallenge: Record<string, CodewarsCompletedChallenge>;
  };
  setSelectedChallenge: (payload: {
    username: string;
    selectedChallenge: CodewarsCompletedChallenge;
  }) => void;
  // setIsCollapsed: (username: string, isCollapsed: boolean) => void;
  // checkUntrackedChallengesAvailability: (
  //   email: string,
  //   untrackedChallengesAvailable: boolean
  // ) => void;
};

export const useCodewarsStore = create<Store>()(
  persist(
    immer((set) => ({
      challenge: { selectedChallenge: {} },
      setSelectedChallenge: ({ username, selectedChallenge }) =>
        set((state) => {
          state.challenge.selectedChallenge[username] = selectedChallenge;
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
