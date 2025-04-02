import { useContext } from "react";
import { DiamondsContextState } from "../../reducers/diamondsReducer";
import { DiamondsContext } from "../../providers/contexts";

const useDiamondsContext = (): DiamondsContextState => {
  const context = useContext(DiamondsContext);
  if (!context) {
    throw new Error(
      "useDiamondsContext must be used within a DiamondsContextProvider"
    );
  }
  return context;
};

export default useDiamondsContext;
