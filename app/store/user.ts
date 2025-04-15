import { AuthenticatedUser } from "@/types/users";
import { Session } from "next-auth";
import { create } from "zustand";

interface UserStore {
  currentUser: AuthenticatedUser | null;
  setCurrentUser: (user: AuthenticatedUser) => void;
  // setSession: (session: Session) => void;
}

export const useUserStore = create<UserStore>((set) => ({
  currentUser: null,
  setCurrentUser: (currentUser) => set({ currentUser }),
  // setSession: (session) =>
  //   set((state) => {
  //     if (!state.currentUser) return {};
  //     return {
  //       currentUser: {
  //         ...state.currentUser,
  //         session,
  //       },
  //     };
  //   }),
}));

/* 
  ✅ Example: One Store for currentUser + allUsers
  Here’s how to set it up:

  import { create } from 'zustand';
  import { AuthenticatedUser } from '@/types/users';

  type UserStore = {
    currentUser: AuthenticatedUser | null;
    allUsers: AuthenticatedUser[];
    setCurrentUser: (user: AuthenticatedUser) => void;
    clearCurrentUser: () => void;
    setAllUsers: (users: AuthenticatedUser[]) => void;
    addUser: (user: AuthenticatedUser) => void;
    removeUser: (email: string) => void;
  };

  export const useUserStore = create<UserStore>((set) => ({
    currentUser: null,
    allUsers: [],
    setCurrentUser: (user) => set({ currentUser: user }),
    clearCurrentUser: () => set({ currentUser: null }),
    setAllUsers: (users) => set({ allUsers: users }),
    addUser: (user) =>
      set((state) => ({
        allUsers: [...state.allUsers, user],
      })),
    removeUser: (email) =>
      set((state) => ({
        allUsers: state.allUsers.filter((u) => u.email !== email),
      })),
  }));

  💡 Usage Examples
  In a component:
  const currentUser = useUserStore((state) => state.currentUser);
  const allUsers = useUserStore((state) => state.allUsers);

  const logout = useUserStore((state) => state.clearCurrentUser);

  Updating users:

  useUserStore.getState().setAllUsers(usersFromApi);

  
  🧠 Why This Works Well
  ✅ Keeps related data together (auth + user management).

  ✅ Zustand's internal batching avoids unnecessary re-renders.

  ✅ Easier to persist or sync with localStorage if needed later.

  🔥 Bonus: Zustand Devtools & Persistence
  If you're doing more complex stuff:

  import { devtools, persist } from 'zustand/middleware';

  export const useUserStore = create<UserStore>()(
    devtools(
      persist(
        (set) => ({
          // state and actions...
        }),
        {
          name: 'user-store', // localStorage key
        }
      )
    )
  );
*/
