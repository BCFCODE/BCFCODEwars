import { Dispatch, useContext } from "react";
import { DiamondsDispatchContext } from "../../providers/Diamonds";
import { DiamondsAction } from "../../reducers/diamondsReducer";

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
