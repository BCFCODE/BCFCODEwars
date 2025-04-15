"use client";

import { createContext, Dispatch } from "react";
import { CodewarsAction, CodewarsState } from "../reducers/codewarsReducer";
import {
  CurrentUserAction
} from "../reducers/currentUser";
import {
  DiamondsAction,
  DiamondsContextState,
} from "../reducers/diamondsReducer";


export const CurrentUserDispatchContext =
  createContext<Dispatch<CurrentUserAction> | null>(null);

export const CodewarsContext = createContext<CodewarsState | null>(null);
export const CodewarsDispatchContext =
  createContext<Dispatch<CodewarsAction> | null>(null);

export const DiamondsContext = createContext<DiamondsContextState | null>(null);
export const DiamondsDispatchContext =
  createContext<React.Dispatch<DiamondsAction> | null>(null);
