"use client";

import APIDiamondsService from "@/app/api/services/diamonds-service";
import { Diamonds } from "@/types/db/diamonds";
import { createContext, ReactNode, useEffect, useReducer } from "react";
import diamondsReducer, { DiamondsAction } from "../reducers/diamondsReducer";

const { getDiamonds } = new APIDiamondsService();

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

const DBDiamondsProvider = ({ children }: Props) => {
  const [DBDiamonds, dispatch] = useReducer(
    diamondsReducer,
    initialDiamondsState
  );

  // const { currentUser } = useCurrentUserContext();

  useEffect(() => {
    (async () => {
      const response = await getDiamonds({ cache: "no-store" });

      if (response.success)
        dispatch({
          type: "SET_DIAMONDS",
          payload: {
            ...initialDiamondsState,
            data: response.data,
          },
        });
      else {
        dispatch({ type: "SET_LOADING", isLoading: true });
        dispatch({ type: "SET_ERROR", isError: true });
      }
    })();
  }, []);

  return (
    <DiamondsContext.Provider value={DBDiamonds}>
      <DiamondsDispatchContext.Provider value={dispatch}>
        {children}
      </DiamondsDispatchContext.Provider>
    </DiamondsContext.Provider>
  );
};

export default DBDiamondsProvider;
