import { Dispatch, useContext } from "react";
import { DBDiamondsDispatchContext } from "../../providers/diamonds/DiamondsProvider";
import { Action } from "../../reducers/diamonds/types";

const useDiamondsDispatchContext = (): Dispatch<Action> => {
  const context = useContext(DBDiamondsDispatchContext);
  if (!context) {
    throw new Error(
      "useDiamondsDispatchContext must be used within a DBDiamondsProvider"
    );
  }
  return context;
};

export default useDiamondsDispatchContext;
