import { CodewarsCompletedChallenge } from "@/types/codewars";
import { AuthenticatedUser } from "@/types/users";
import { create } from "zustand";
import getRank from "../context/reducers/currentUser/getRank";
import {
  CodeChallengesFilter,
  CodewarsDiamondsRecord,
  CodewarsRanks,
  CodewarsRankTotals,
  Diamonds,
} from "@/types/diamonds";
import syncCurrentWithAllUsers from "./utils/syncCurrentWithAllUsers";

interface Actions {
  setAllUsers: (users: AuthenticatedUser[]) => void;
  initializeCurrentUser: (email: string) => void;
  updateCurrentUser: (currentUser: AuthenticatedUser) => void;
  updateCodeChallengesList: (list: CodewarsCompletedChallenge[]) => void;
  updateDiamondsAndRank: ({
    selectedChallenge,
    reward,
  }: {
    selectedChallenge: CodewarsCompletedChallenge;
    reward: number;
  }) => void;
  updateCollectionFilter: (filterName: CodeChallengesFilter) => void;
  checkUntrackedChallengesAvailability: (isAvailable: boolean) => void;
  addUntrackedChallengesToList: (
    untrackedChallenges: CodewarsCompletedChallenge[]
  ) => void;
}

export interface UsersStore {
  currentUser: AuthenticatedUser | null;
  allUsers: AuthenticatedUser[];
  actions: Actions;
}

export const useUsersStore = create<UsersStore>((set) => ({
  allUsers: [],
  currentUser: null,
  actions: {
    setAllUsers: (allUsers) => set((state) => ({ ...state, allUsers })),
    initializeCurrentUser: (email) =>
      set((state) => ({
        ...state,
        currentUser: state.allUsers.find((u) => u.email === email) ?? null,
      })),
    updateCurrentUser: (currentUser) => {
      set((state) => ({ ...state, currentUser }));
      set((state) => ({
        ...state,
        allUsers: state.allUsers.map((u) =>
          u.email === currentUser.email ? currentUser : u
        ),
      }));
    },
    updateCodeChallengesList: (list) =>
      set((state) => {
        if (!state.currentUser) return state;

        const updatedUser: AuthenticatedUser = {
          ...state.currentUser,
          codewars: {
            ...state.currentUser?.codewars,
            codeChallenges: {
              ...state.currentUser?.codewars.codeChallenges,
              list,
            },
          },
        };

        return syncCurrentWithAllUsers({ state, updatedUser });
      }),
    updateDiamondsAndRank: ({ selectedChallenge, reward }) => {
      set((state) => {
        if (!state.currentUser) return state;

        const currentRankId = getRank(selectedChallenge);

        const ranks: CodewarsRanks = {
          ...state.currentUser.diamonds.totals.codewars.ranks,
          [currentRankId]:
            state.currentUser.diamonds.totals.codewars.ranks[currentRankId] +
            reward,
        };

        const updateCodewarsRanks: CodewarsRankTotals = {
          ...state.currentUser.diamonds.totals.codewars,
          ranks,
          total: state.currentUser.diamonds.totals.codewars.total + reward,
        };

        const newCodewarsChallengeRecord: CodewarsDiamondsRecord = {
          id: selectedChallenge.id,
          rank: currentRankId,
          diamondsEarned: reward,
          collectedAt: new Date(),
          completedAt: new Date(selectedChallenge.completedAt),
        };

        const diamonds: Diamonds = {
          ...state.currentUser.diamonds,
          codewars: [
            ...state.currentUser.diamonds.codewars,
            newCodewarsChallengeRecord,
          ],
          totals: {
            ...state.currentUser.diamonds.totals,
            codewars: updateCodewarsRanks,
            total: state.currentUser.diamonds.totals.total + reward,
          },
        };

        const updatedUser: AuthenticatedUser = {
          ...state.currentUser,
          diamonds,
        };

        return syncCurrentWithAllUsers({ state, updatedUser });
      });
    },
    updateCollectionFilter: (filterName) => {
      set((state) => {
        if (!state.currentUser) return state;
        const updatedUser: AuthenticatedUser = {
          ...state.currentUser,
          codewars: {
            ...state.currentUser.codewars,
            codeChallenges: {
              ...state.currentUser.codewars.codeChallenges,
              challengeFilter: filterName,
            },
          },
        };
        return syncCurrentWithAllUsers({ state, updatedUser });
      });
    },
    checkUntrackedChallengesAvailability: (isAvailable) => {
      set((state) => {
        if (!state.currentUser) return state;
        const updatedUser: AuthenticatedUser = {
          ...state.currentUser,
          codewars: {
            ...state.currentUser.codewars,
            codeChallenges: {
              ...state.currentUser.codewars.codeChallenges,
              untrackedChallengesAvailable: isAvailable,
            },
          },
        };
        return syncCurrentWithAllUsers({ state, updatedUser });
      });
    },
    addUntrackedChallengesToList: (untrackedChallenges) => {
      set((state) => {
        if (!state.currentUser) return state;

        const updatedUser: AuthenticatedUser = {
          ...state.currentUser,
          codewars: {
            ...state.currentUser.codewars,
            codeChallenges: {
              ...state.currentUser.codewars.codeChallenges,
              list: [
                ...untrackedChallenges,
                ...state.currentUser.codewars.codeChallenges.list,
              ],
            },
          },
        };

        return syncCurrentWithAllUsers({ state, updatedUser });
      });
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
