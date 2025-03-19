import { CurrentUser } from "@/types/db/users";
import { AllUsersContextType } from "../providers/AllUsers";

export type AllUsersState = AllUsersContextType;

export type AllUsersAction =
  | { type: "UPDATE_CURRENT_USER"; currentUser: CurrentUser }
  | { type: "SET_ALL_USERS"; payload: AllUsersState }
  | { type: "SET_ERROR"; error: boolean }
  | { type: "SET_LOADING"; loading: boolean };

const allUsersReducer = (
  state: AllUsersState,
  action: AllUsersAction
): AllUsersState => {
  switch (action.type) {
    case "UPDATE_CURRENT_USER": {
      const allUsers = state.allUsers.map((user) =>
        user.email === action.currentUser.email ? action.currentUser : user
      );
      return { ...state, allUsers };
    }
    case "SET_ALL_USERS":
      return { ...action.payload };
    case "SET_ERROR":
      return { ...state, error: action.error };
    case "SET_LOADING":
      return { ...state, error: action.loading };
    default:
      return state;
  }
};

export default allUsersReducer;
