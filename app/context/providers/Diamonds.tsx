"use client";

import DiamondsAPIService from "@/app/api/services/diamonds";
import { Diamonds } from "@/types/diamonds";
import { createContext, ReactNode, useEffect, useReducer } from "react";
import diamondsReducer, { DiamondsAction } from "../reducers/diamondsReducer";

const { getDiamonds } = new DiamondsAPIService();

export interface Context {}

export interface DiamondsContextState extends Context {
  data?: Diamonds;
  isDiamondIconButtonDisabled: boolean;
  isLoading: boolean;
  isError: boolean;
  // success: boolean;
  // error?: string;
  // isCollected?: boolean;
  // collectedCount?: number;
  // sumCounter?: number;
  // collectedCounter: number;
}

interface Props {
  children: ReactNode;
  context?: Diamonds;
}

// Default (synchronous) state for diamonds
const initialDiamondsState: DiamondsContextState = {
  isDiamondIconButtonDisabled: false,
  isLoading: false,
  isError: false,
};

export const DiamondsContext = createContext<DiamondsContextState | null>(null);
export const DiamondsDispatchContext =
  createContext<React.Dispatch<DiamondsAction> | null>(null);

const DiamondsProvider = ({ children }: Props) => {
  const [DatabaseDiamonds, diamondsDispatch] = useReducer(
    diamondsReducer,
    initialDiamondsState
  );

  useEffect(() => {
    (async () => {
      const response = await getDiamonds({ cache: "no-store" });
// console.log('DiamondsProvider  getDiamonds({ cache: "no-store" }); response', response)
      if (response.success) {
        diamondsDispatch({
          type: "SET_DIAMONDS",
          payload: {
            ...initialDiamondsState,
            data: response.data,
          },
        });
      } else {
        diamondsDispatch({ type: "SET_LOADING", isLoading: true });
        diamondsDispatch({ type: "SET_ERROR", isError: true });
      }
    })();
  }, []);

  return (
    <DiamondsContext.Provider value={DatabaseDiamonds}>
      <DiamondsDispatchContext.Provider value={diamondsDispatch}>
        {children}
      </DiamondsDispatchContext.Provider>
    </DiamondsContext.Provider>
  );
};

export default DiamondsProvider;
