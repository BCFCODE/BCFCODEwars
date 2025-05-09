import { AuthenticatedUser, CurrentUserState } from "@/types/users";
import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
// import syncCurrentWithAllUsers from "./utils/syncCurrentWithAllUsers";

type Store = {
  selectedUser: AuthenticatedUser | null;
  setSelectedUser: (selectedUser: AuthenticatedUser) => void;
  currentUserState: CurrentUserState;
  setIsCollapsed: (isCollapsed: boolean) => void;
  // currentUser: AuthenticatedUser | null;
  // allUsers: AuthenticatedUser[];
};

export const useUsersStore = create<Store>()(
  immer((set) => ({
    selectedUser: null,
    setSelectedUser: (selectedUser) =>
      set((state) => {
        state.selectedUser = selectedUser;
      }),
    currentUserState: { isCollapsed: true },
    setIsCollapsed: (isCollapsed) =>
      set((state) => {
        state.currentUserState.isCollapsed = isCollapsed;
      }),
  }))
);
