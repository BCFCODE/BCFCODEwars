import { useContext } from "react";
import { DiamondsContext } from "../../providers/Diamonds";
import { DiamondsContextState } from "../../providers/diamonds/types";

const useDiamondsContext = (): DiamondsContextState => {
  const context = useContext(DiamondsContext);
  if (!context) {
    throw new Error(
      "useDiamondsContext must be used within a DBDiamondsProvider"
    );
  }
  return context;
};

export default useDiamondsContext;
