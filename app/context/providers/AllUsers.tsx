'use client'

import { AllUsersContextType } from "@/app/context/reducers/allUsersReducer";

import { ReactNode } from "react";
import useAllUsers from "./effects/useAllUsers";
import { AllUsersContext, AllUsersDispatchContext } from "./contexts";

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
