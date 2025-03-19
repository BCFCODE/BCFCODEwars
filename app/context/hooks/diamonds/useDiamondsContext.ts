import { useContext } from "react";
import {
  DiamondsContext,
  DiamondsContextState,
} from "../../providers/Diamonds";

const useDiamondsContext = (): DiamondsContextState => {
  const context = useContext(DiamondsContext);
  if (!context) {
    throw new Error(
      "useDiamondsContext must be used within a DiamondsProvider"
    );
  }
  return context;
};

export default useDiamondsContext;
