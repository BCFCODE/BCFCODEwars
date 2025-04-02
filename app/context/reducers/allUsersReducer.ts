import { AuthenticatedUser } from "@/types/users";

export interface AllUsersContextType {
  isLoading: boolean;
  error: boolean;
  allUsers: AuthenticatedUser[];
}
export type AllUsersState = AllUsersContextType;

export type AllUsersAction =
  | { type: "SET_ALL_USERS"; payload: AllUsersState }
  | { type: "SET_ERROR"; error: boolean }
  | { type: "SET_LOADING"; loading: boolean }
  | { type: "UPDATE_CURRENT_USER"; currentUser: AuthenticatedUser }
  | {
      type: "INCREASE_TOTAL_AND_CODEWARS_DIAMONDS_SUM";
      collectedDiamondsCount: number;
      currentUser: AuthenticatedUser;
    };

export const initialDatabaseAllUsersState = {
  allUsers: [],
  isLoading: true,
  error: false,
};

const allUsersReducer = (
  state: AllUsersState,
  action: AllUsersAction
): AllUsersState => {
  switch (action.type) {
    case "SET_ALL_USERS":
      return { ...action.payload };
    case "SET_ERROR":
      return { ...state, error: action.error };
    case "SET_LOADING":
      return { ...state, error: action.loading };
    case "UPDATE_CURRENT_USER": {
      const allUsers = state.allUsers.map((user) =>
        user.email === action.currentUser.email ? action.currentUser : user
      );
      return { ...state, allUsers };
    }
    default:
      return state;
  }
};

export default allUsersReducer;
