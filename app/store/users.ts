import { AuthenticatedUser } from "@/types/users";
import { create } from "zustand";

interface Actions {
  setAllUsers: (users: AuthenticatedUser[]) => void;
  initializeCurrentUser: (email: string) => void;
  updateCurrentUser: (currentUser: AuthenticatedUser) => void;
}

interface UsersStore {
  currentUser: AuthenticatedUser | null;
  allUsers: AuthenticatedUser[];
  actions: Actions;
}

export const useUsersStore = create<UsersStore>((set) => ({
  allUsers: [],
  currentUser: null,
  actions: {
    setAllUsers: (allUsers) => set({ allUsers }),
    initializeCurrentUser: (email) =>
      set(({ allUsers }) => ({
        currentUser: allUsers.find((u) => u.email === email) ?? null,
      })),
    updateCurrentUser: (currentUser) => {
      set({ currentUser });
      set(({ allUsers }) => ({
        allUsers: allUsers.map((u) =>
          u.email === currentUser.email ? currentUser : u
        ),
      }));
    },
  },
}));

/* 
  ✅ Example: One Store for currentUser + allUsers
  Here’s how to set it up:

  import { create } from 'zustand';
  import { AuthenticatedUser } from '@/types/users';

  type UsersStore = {
    currentUser: AuthenticatedUser | null;
    allUsers: AuthenticatedUser[];
    initializeCurrentUser: (user: AuthenticatedUser) => void;
    clearCurrentUser: () => void;
    setAllUsers: (users: AuthenticatedUser[]) => void;
    addUser: (user: AuthenticatedUser) => void;
    removeUser: (email: string) => void;
  };

  export const useUsersStore = create<UsersStore>((set) => ({
    currentUser: null,
    allUsers: [],
    initializeCurrentUser: (user) => set({ currentUser: user }),
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
  const currentUser = useUsersStore((state) => state.currentUser);
  const allUsers = useUsersStore((state) => state.allUsers);

  const logout = useUsersStore((state) => state.clearCurrentUser);

  Updating users:

  useUsersStore.getState().setAllUsers(usersFromApi);

  
  🧠 Why This Works Well
  ✅ Keeps related data together (auth + user management).

  ✅ Zustand's internal batching avoids unnecessary re-renders.

  ✅ Easier to persist or sync with localStorage if needed later.

  🔥 Bonus: Zustand Devtools & Persistence
  If you're doing more complex stuff:

  import { devtools, persist } from 'zustand/middleware';

  export const useUsersStore = create<UsersStore>()(
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
