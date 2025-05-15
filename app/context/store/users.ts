import { AuthenticatedUser } from "@/types/users";
import { create } from "zustand";
import { persist } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";
import { PERSIST_KEYS } from "./storeKeys";

type Store = {
  user: {
    selectedUser?: AuthenticatedUser;
    isCollapsed: Record<string, boolean>;
  };
  setSelectedUser: (selectedUser: AuthenticatedUser) => void;
  setIsCollapsed: (email: string, isCollapsed: boolean) => void;
};

export const useUsersStore = create<Store>()(
  persist(
    immer((set) => ({
      user: { isCollapsed: {} },
      setSelectedUser: (selectedUser) =>
        set((state) => {
          state.user.selectedUser = selectedUser;
        }),
      setIsCollapsed: (email, isCollapsed) =>
        set((state) => {
          if (state.user.selectedUser)
            state.user.isCollapsed[email] = isCollapsed;
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
