"use client";

import APIdbService from "@/app/api/services/db-service";
import allUsersReducer, { AllUsersAction } from "@/app/context/reducers/allUsersReducer";
import { CurrentUser } from "@/types/users";

import {
  createContext,
  Dispatch,
  ReactNode,
  useEffect,
  useReducer,
} from "react";

const { getUsers } = new APIdbService();

export interface AllUsersContextType {
  isLoading: boolean;
  error: boolean;
  allUsers: CurrentUser[];
}

interface Props {
  children: ReactNode;
  context?: AllUsersContextType;
}

const initialDBAllUsersState = {
  allUsers: [],
  isLoading: true,
  error: false,
};

export const AllUsersContext = createContext<AllUsersContextType | null>(null);
export const AllUsersDispatchContext =
  createContext<Dispatch<AllUsersAction> | null>(null);

const AllUsersProvider = ({ children }: Props) => {
  const [allUsersContext, dispatch] = useReducer(
    allUsersReducer,
    initialDBAllUsersState
  );

  useEffect(() => {
    (async () => {
      try {
        // Reset loading and error before retrying.
        dispatch({ type: "SET_LOADING", loading: true });
        dispatch({ type: "SET_ERROR", error: false });

        const fetchedUsers = await getUsers({ cache: "no-store" });

        if (!fetchedUsers.success || fetchedUsers.error) {
          console.log("error in AllUsersProvider");
          dispatch({ type: "SET_LOADING", loading: false });
          dispatch({ type: "SET_ERROR", error: true });
        }

        if (fetchedUsers.success) {
          dispatch({
            type: "SET_ALL_USERS",
            payload: {
              allUsers: fetchedUsers.users as CurrentUser[],
              error: false,
              isLoading: false,
            },
          });
        }
      } catch (error) {
        dispatch({ type: "SET_LOADING", loading: false });
        dispatch({ type: "SET_ERROR", error: true });
        // If an exception occurs, set the error flag.
        // dispatch({ type: "SET_ERROR", error: true });
        console.error("Error loading leaderboard data");
      } finally {
        dispatch({ type: "SET_LOADING", loading: false });
      }
    })();
  }, []);

  return (
    <AllUsersDispatchContext.Provider value={dispatch}>
      <AllUsersContext.Provider value={allUsersContext}>
        {children}
      </AllUsersContext.Provider>
    </AllUsersDispatchContext.Provider>
  );
};

export default AllUsersProvider;
