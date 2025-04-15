import { create } from "zustand";

interface Actions {
  setIsLoading: (isLoading: boolean) => void;
  setIsError: (isError: boolean) => void;
  setIsCollapsed: (isCollapsed: boolean) => void;
}

interface LeaderboardStore {
  isLoading: boolean;
  isError: boolean;
  currentUser: {
    isCollapsed: boolean;
  };
  actions: Actions;
}

export const useLeaderBoardStore = create<LeaderboardStore>((set) => ({
  isLoading: true,
  isError: false,
  currentUser: { isCollapsed: false },
  actions: {
    setIsLoading: (isLoading) => set({ isLoading }),
    setIsError: (isError) => set({ isError }),
    setIsCollapsed: (isCollapsed) =>
      set(({ currentUser }) => ({
        currentUser: { ...currentUser, isCollapsed },
      })),
  },
}));
