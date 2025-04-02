import { Dispatch, useContext } from "react";
import { DiamondsAction } from "../../reducers/diamondsReducer";
import { DiamondsDispatchContext } from "../../providers/contexts";

const useDiamondsDispatchContext = (): Dispatch<DiamondsAction> => {
  const context = useContext(DiamondsDispatchContext);
  if (!context) {
    throw new Error(
      "useDiamondsDispatchContext must be used within a DiamondsDispatchContextProvider"
    );
  }
  return context;
};

export default useDiamondsDispatchContext;
