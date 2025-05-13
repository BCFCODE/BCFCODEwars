import { AuthenticatedUser } from "@/types/users";
import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

type Store = {
  user: {
    selectedUser?: AuthenticatedUser;
    isCollapsed: Record<string, boolean>;
  };
  setSelectedUser: (selectedUser: AuthenticatedUser) => void;
  setIsCollapsed: (email: string, isCollapsed: boolean) => void;
};

export const useUsersStore = create<Store>()(
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
  }))
);
