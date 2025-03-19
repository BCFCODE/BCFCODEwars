import { CurrentUser } from "@/types/db/users";
import { AllUsersContextType } from "../providers/AllUsers";

export type AllUsersState = AllUsersContextType;

export type AllUsersAction =
  | { type: "SET_ALL_USERS"; payload: AllUsersState }
  | { type: "SET_ERROR"; error: boolean }
  | { type: "SET_LOADING"; loading: boolean }
  | { type: "UPDATE_CURRENT_USER"; currentUser: CurrentUser }
  | {
      type: "INCREASE_TOTAL_AND_CODEWARS_DIAMONDS_SUM";
      collectedDiamondsCount: number;
      currentUser: CurrentUser;
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
    case "INCREASE_TOTAL_AND_CODEWARS_DIAMONDS_SUM": {
      const allUsers = state.allUsers.map((user) => {
        if (user.email === action.currentUser.email) {
          const newUser = { ...user };
          newUser.diamonds.sum.codewars += action.collectedDiamondsCount;
          newUser.diamonds.sum.total += action.collectedDiamondsCount;
          return newUser;
        } else return user;
      });
      return { ...state, allUsers };
    }
    default:
      return state;
  }
};

export default allUsersReducer;
