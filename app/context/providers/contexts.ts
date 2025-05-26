"use client";

import { createContext, Dispatch } from "react";
import {
  AllUsersAction,
  AllUsersContextType,
} from "@/app/context/reducers/allUsersReducer";
import { CodewarsAction, CodewarsState } from "../reducers/codewarsReducer";
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

export const CodewarsContext = createContext<CodewarsState | null>(null);
export const CodewarsDispatchContext =
  createContext<Dispatch<CodewarsAction> | null>(null);
