"use client";

import APIDiamondsService from "@/app/api/services/diamonds-service";
import { DBDiamonds } from "@/types/db/diamonds";
import { createContext, ReactNode, useEffect, useReducer } from "react";
import dbDiamondsReducer from "../../reducers/diamonds/diamondsReducer";
import { Action } from "../../reducers/diamonds/types";
import { DiamondsContextState } from "./types";

const { getDiamonds } = new APIDiamondsService();

interface Props {
  children: ReactNode;
  context?: DBDiamonds;
}

// Default (synchronous) state for diamonds
const initialDiamondsState: DiamondsContextState = {
  isLoading: false,
  isError: false,
};

export const DiamondsContext = createContext<DiamondsContextState | null>(null);
export const DiamondsDispatchContext =
  createContext<React.Dispatch<Action> | null>(null);

const DBDiamondsProvider = ({ children }: Props) => {
  const [DBDiamonds, dispatch] = useReducer(
    dbDiamondsReducer,
    initialDiamondsState
  );

  useEffect(() => {
    (async () => {
      const response = await getDiamonds({ cache: "no-store" });

      if (response.success)
        dispatch({
          type: "SET_DIAMONDS",
          payload: { data: response.data, isLoading: false, isError: false },
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
