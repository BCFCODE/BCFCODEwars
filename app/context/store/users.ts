import { AuthenticatedUser, CurrentUserState } from "@/types/users";
import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
// import syncCurrentWithAllUsers from "./utils/syncCurrentWithAllUsers";

type Store = {
  user: {
    selectedUser?: AuthenticatedUser;
    currentUserState: CurrentUserState;
  };
  setSelectedUser: (selectedUser: AuthenticatedUser) => void;
  setIsCollapsed: (isCollapsed: boolean) => void;
  // currentUser: AuthenticatedUser | null;
  // allUsers: AuthenticatedUser[];
};

export const useUsersStore = create<Store>()(
  immer((set) => ({
    user: {
      selectedUser: {} as AuthenticatedUser,
      currentUserState: { isCollapsed: true },
    },
    setSelectedUser: (selectedUser) =>
      set((state) => {
        state.user.selectedUser = selectedUser;
      }),
    setIsCollapsed: (isCollapsed) =>
      set((state) => {
        state.user.currentUserState.isCollapsed = isCollapsed;
      }),
  }))
);
