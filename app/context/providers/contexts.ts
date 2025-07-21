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
import { GaugeContextValue } from "@/app/context/providers/GaugeProvider";
import { Email } from "./EmailProvider";

export const AllUsersContext = createContext<AllUsersContextType | null>(null);
export const AllUsersDispatchContext =
  createContext<Dispatch<AllUsersAction> | null>(null);

export const CurrentUserContext = createContext<CurrentUserContextType | null>(
  null
);
export const CurrentUserDispatchContext =
  createContext<Dispatch<CurrentUserAction> | null>(null);

export const GaugeContext = createContext<GaugeContextValue | null>(null);

export const EmailContext = createContext<Email | null>(null);
