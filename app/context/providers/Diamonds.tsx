"use client";

import { Diamonds } from "@/types/diamonds";
import { createContext, ReactNode } from "react";
import {
  DiamondsAction,
  DiamondsContextState,
} from "../reducers/diamondsReducer";
import useDiamonds from "./effects/useDiamonds";

export const DiamondsContext = createContext<DiamondsContextState | null>(null);
export const DiamondsDispatchContext =
  createContext<React.Dispatch<DiamondsAction> | null>(null);

interface Props {
  children: ReactNode;
  context?: Diamonds;
}

const DiamondsProvider = ({ children }: Props) => {
  const { diamondsState, diamondsDispatch } = useDiamonds();

  return (
    <DiamondsContext.Provider value={diamondsState}>
      <DiamondsDispatchContext.Provider value={diamondsDispatch}>
        {children}
      </DiamondsDispatchContext.Provider>
    </DiamondsContext.Provider>
  );
};

export default DiamondsProvider;
