import { Dispatch, useContext } from "react";
import { DiamondsDispatchContext } from "../providers/diamonds/DiamondsProvider";
import { Action } from "../reducers/diamonds/types";

const useDiamondsDispatchContext = (): Dispatch<Action> => {
  const context = useContext(DiamondsDispatchContext);
  if (!context) {
    throw new Error(
      "useDiamondsDispatchContext must be used within a DiamondsProvider"
    );
  }
  return context;
};

export default useDiamondsDispatchContext;
