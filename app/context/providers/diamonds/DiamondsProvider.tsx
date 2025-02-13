"use client";

import APIDiamondsService from "@/app/api/services/diamonds-service";
import { DBDiamonds } from "@/types/db/diamonds";
import { createContext, ReactNode, useEffect, useReducer } from "react";
import diamondsReducer from "../../reducers/diamonds/diamondsReducer";
import { Action } from "../../reducers/diamonds/types";
import { DiamondsState } from "./types";

const { getDiamonds } = new APIDiamondsService();

interface Props {
  children: ReactNode;
  context?: DBDiamonds;
}

export const DiamondsContext = createContext<DiamondsState | null>(null);
export const DiamondsDispatchContext =
  createContext<React.Dispatch<Action> | null>(null);

const DiamondsProvider = ({ children, context }: Props) => {
  // Default (synchronous) state for diamonds
  const initialDBDiamondsState: DiamondsState = {
    success: false,
    isLoading: false,
    isError: false,
    collectedCounter: 0,
  };

  const [DBDiamonds, dispatch] = useReducer(
    diamondsReducer,
    initialDBDiamondsState
  );

  useEffect(() => {
    (async () => {
      const diamonds = await getDiamonds({ cache: "no-store" });
      dispatch({
        type: "SET_DIAMONDS",
        payload: {
          success: diamonds?.success,
          data: diamonds?.data,
          isError: false,
          isLoading: false,
          collectedCounter: 0,
        },
      });
    })();
  }, []);
  console.log(DBDiamonds, "<<<<<<<<<<<<<<<<<< DiamondsProvider");
  return (
    <DiamondsContext.Provider value={DBDiamonds}>
      <DiamondsDispatchContext.Provider value={dispatch}>
        {children}
      </DiamondsDispatchContext.Provider>
    </DiamondsContext.Provider>
  );
};

export default DiamondsProvider;
