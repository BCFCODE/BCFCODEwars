import { AuthenticatedUser } from "@/types/users";
import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

export interface SelectedUser extends AuthenticatedUser {
  isCollapsed: boolean;
}

type Store = {
  user: { selectedUser?: SelectedUser };
  setSelectedUser: (selectedUser: SelectedUser) => void;
  setIsCollapsed: (isCollapsed: boolean) => void;
};

export const useUsersStore = create<Store>()(
  immer((set) => ({
    user: {},
    setSelectedUser: (selectedUser) =>
      set((state) => {
        state.user.selectedUser = selectedUser;
      }),
    setIsCollapsed: (isCollapsed) =>
      set((state) => {
        if (state.user.selectedUser)
          state.user.selectedUser.isCollapsed = isCollapsed;
      }),
  }))
);
