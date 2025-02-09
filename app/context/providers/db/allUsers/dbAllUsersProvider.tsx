"use client";

import APIdbService from "@/app/api/services/db-service";
import dbAllUsersReducer from "@/app/context/reducers/users/allUsers/dbAllUsersReducer";
import { Action } from "@/app/context/reducers/users/allUsers/types";
import { DBUser } from "@/types/db/users";
import {
  createContext,
  Dispatch,
  ReactNode,
  useEffect,
  useReducer,
  useRef,
} from "react";
import { AllUsersContextType } from "./types";

const { getUsers } = new APIdbService();

interface Props {
  children: ReactNode;
  context?: AllUsersContextType;
}

const initialDBAllUsersState = {
  allUsers: [],
  isLoading: true,
  error: false,
};

export const DBAllUsersContext = createContext<AllUsersContextType | null>(
  null
);
export const DBAllUsersDispatchContext = createContext<Dispatch<Action> | null>(
  null
);

const DBAllUsersProvider = ({ children }: Props) => {
  const [allUsersContext, dispatch] = useReducer(
    dbAllUsersReducer,
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
          console.log('error in DBAllUsersProvider')
          dispatch({ type: "SET_LOADING", loading: false });
          dispatch({ type: "SET_ERROR", error: true });
        }

        if (fetchedUsers.success) {
          dispatch({
            type: "SET_ALL_USERS",
            payload: {
              allUsers: fetchedUsers.users as DBUser[],
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
    <DBAllUsersDispatchContext.Provider value={dispatch}>
      <DBAllUsersContext.Provider value={allUsersContext}>
        {children}
      </DBAllUsersContext.Provider>
    </DBAllUsersDispatchContext.Provider>
  );
};

export default DBAllUsersProvider;
