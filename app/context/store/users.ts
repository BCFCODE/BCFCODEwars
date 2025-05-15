import { AuthenticatedUser } from "@/types/users";
import { create } from "zustand";
import { persist } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";
import { PERSIST_KEYS } from "./storeKeys";

type Store = {
  user: {
    selectedUser?: AuthenticatedUser;
    isCollapsed: Record<string, boolean>;
    untrackedChallengesAvailable: Record<string, boolean>;
  };
  setSelectedUser: (selectedUser: AuthenticatedUser) => void;
  setIsCollapsed: (email: string, isCollapsed: boolean) => void;
  checkUntrackedChallengesAvailability: (
    email: string,
    untrackedChallengesAvailable: boolean
  ) => void;
};

export const useUsersStore = create<Store>()(
  persist(
    immer((set) => ({
      user: { isCollapsed: {}, untrackedChallengesAvailable: {} },
      setSelectedUser: (selectedUser) =>
        set((state) => {
          state.user.selectedUser = selectedUser;
        }),
      setIsCollapsed: (email, isCollapsed) =>
        set((state) => {
          if (state.user.selectedUser)
            state.user.isCollapsed[email] = isCollapsed;
        }),
      checkUntrackedChallengesAvailability: (
        email,
        untrackedChallengesAvailable
      ) =>
        set((state) => {
          if (state.user.selectedUser)
            state.user.untrackedChallengesAvailable[email] =
              untrackedChallengesAvailable;
        }),
    })),
    {
      name: PERSIST_KEYS.users,
      partialize: (state) => ({
        user: { isCollapsed: state.user.isCollapsed },
      }),
    }
  )
);
