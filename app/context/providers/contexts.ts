"use client";

import { createContext, Dispatch } from "react";
import {
  AllUsersAction,
  AllUsersContextType,
} from "@/app/context/reducers/allUsersReducer";
import {
  CurrentUserAction,
  CurrentUserContext as CurrentUserContextType,
} from "../reducers/currentUser";

export const AllUsersContext = createContext<AllUsersContextType | null>(null);
export const AllUsersDispatchContext =
  createContext<Dispatch<AllUsersAction> | null>(null);

export const CurrentUserContext = createContext<CurrentUserContextType | null>(
  null
);
export const CurrentUserDispatchContext =
  createContext<Dispatch<CurrentUserAction> | null>(null);

