"use client";

import APIDiamondsService from "@/app/api/services/diamonds-service";
import { APIdbDiamondsFailedResponse, DBDiamonds } from "@/types/db/diamonds";
import { createContext, ReactNode, useEffect, useReducer } from "react";
import dbDiamondsReducer from "../../reducers/diamonds/dbDiamondsReducer";
import { Action, DiamondsState } from "../../reducers/diamonds/types";

const { getDiamonds } = new APIDiamondsService();

interface Props {
  children: ReactNode;
  context?: DBDiamonds;
}

// Default (synchronous) state for diamonds
const initialDBDiamonds: APIdbDiamondsFailedResponse = {
  success: false,
  error: "",
};

export const DBDiamondsContext = createContext<DiamondsState | null>(null);
export const DBDiamondsDispatchContext =
  createContext<React.Dispatch<Action> | null>(null);

const DBDiamondsProvider = ({ children }: Props) => {
  const [DBDiamonds, dispatch] = useReducer(
    dbDiamondsReducer,
    initialDBDiamonds
  );

  useEffect(() => {
    (async () => {
      const diamonds = await getDiamonds();
      dispatch({ type: "SET_DIAMONDS", payload: diamonds });
    })();
  }, []);
  console.log(DBDiamonds, "<<<<<<<<<<<<<<<<<< DBDiamondsProvider");
  return (
    <DBDiamondsContext.Provider value={DBDiamonds}>
      <DBDiamondsDispatchContext.Provider value={dispatch}>
        {children}
      </DBDiamondsDispatchContext.Provider>
    </DBDiamondsContext.Provider>
  );
};

export default DBDiamondsProvider;
