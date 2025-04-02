"use client";

import dbAPIService from "@/app/api/services/db";
import allUsersReducer, {
  AllUsersAction,
} from "@/app/context/reducers/allUsersReducer";
import { AuthenticatedUser } from "@/types/users";
import { useSession } from "next-auth/react";

import {
  createContext,
  Dispatch,
  ReactNode,
  useEffect,
  useReducer,
} from "react";

const { getUsers } = new dbAPIService();

export interface AllUsersContextType {
  isLoading: boolean;
  error: boolean;
  allUsers: AuthenticatedUser[];
}

interface Props {
  children: ReactNode;
  context?: AllUsersContextType;
  // currentUserEmail: string;
  // session: Session | null;
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
  const session = useSession();
  const [allUsersContext, allUsersDispatch] = useReducer(
    allUsersReducer,
    initialDBAllUsersState
  );
  // const sessionRef = useRef(session);
  // console.log("session in AllUsersProvider", session);
  // if (session !== null) sessionRef.current = session;

  useEffect(() => {
    if (!session.data) return; // Wait for session to load
    (async () => {
      try {
        // Reset loading and error before retrying.
        allUsersDispatch({ type: "SET_LOADING", loading: true });
        allUsersDispatch({ type: "SET_ERROR", error: false });

        const fetchedUsers = await getUsers({ cache: "no-store" });

        if (!fetchedUsers.success || fetchedUsers.error) {
          // console.log("error in AllUsersProvider");
          allUsersDispatch({ type: "SET_LOADING", loading: false });
          allUsersDispatch({ type: "SET_ERROR", error: true });
        }

        if (fetchedUsers.users) {
          const allUsers = fetchedUsers.users.map((user) => {
            // console.log(
            //   "in AllUsersProvider useEffect map",
            //   user.email,
            //   session.data
            // );
            return user.email === session.data?.user.email
              ? { ...user, session: session.data }
              : user;
          }) as AuthenticatedUser[];

          // const allUsers = fetchedUsers.users as AuthenticatedUser[]

          // console.log("allUsers in AllUsersProvider", allUsers, session.data);

          allUsersDispatch({
            type: "SET_ALL_USERS",
            payload: {
              allUsers,
              error: false,
              isLoading: false,
            },
          });
        }
      } catch (error) {
        allUsersDispatch({ type: "SET_LOADING", loading: false });
        allUsersDispatch({ type: "SET_ERROR", error: true });
        // If an exception occurs, set the error flag.
        // allUsersDispatch({ type: "SET_ERROR", error: true });
        // console.error("Error loading leaderboard data");
      } finally {
        allUsersDispatch({ type: "SET_LOADING", loading: false });
      }
    })();
  }, []);

  return (
    <AllUsersContext.Provider value={allUsersContext}>
      <AllUsersDispatchContext.Provider value={allUsersDispatch}>
        {children}
      </AllUsersDispatchContext.Provider>
    </AllUsersContext.Provider>
  );
};

export default AllUsersProvider;
