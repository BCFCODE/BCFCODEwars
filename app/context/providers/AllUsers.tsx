"use client";

import {
  AllUsersAction,
  AllUsersContextType,
} from "@/app/context/reducers/allUsersReducer";

import { createContext, Dispatch, ReactNode } from "react";
import useAllUsers from "./effects/useAllUsers";

export const AllUsersContext = createContext<AllUsersContextType | null>(null);
export const AllUsersDispatchContext =
  createContext<Dispatch<AllUsersAction> | null>(null);

interface Props {
  children: ReactNode;
  context?: AllUsersContextType;
}

const AllUsersProvider = ({ children }: Props) => {
  const { allUsersContext, allUsersDispatch } = useAllUsers();

  return (
    <AllUsersContext.Provider value={allUsersContext}>
      <AllUsersDispatchContext.Provider value={allUsersDispatch}>
        {children}
      </AllUsersDispatchContext.Provider>
    </AllUsersContext.Provider>
  );
};

export default AllUsersProvider;
