import { Dispatch, useContext } from "react";
import { DBDiamondsDispatchContext } from "../providers/diamonds/DBDiamondsProvider";
import { Action } from "../reducers/diamonds/types";

const useDBDiamondsDispatchContext = (): Dispatch<Action> => {
  const context = useContext(DBDiamondsDispatchContext);
  if (!context) {
    throw new Error(
      "useDBDiamondsDispatchContext must be used within a DBDiamondsProvider"
    );
  }
  return context;
};

export default useDBDiamondsDispatchContext;
