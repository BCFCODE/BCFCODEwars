import { useContext } from "react";
import { DiamondsContext } from "../providers/diamonds/DiamondsProvider";
import { DiamondsContextState } from "../providers/diamonds/types";

const useDiamondsContext = (): DiamondsContextState => {
  const context = useContext(DiamondsContext);
  if (!context) {
    throw new Error(
      "useDiamondsContext must be used within a DiamondsProvider"
    );
  }
  console.log(context, "<<<<<< useDiamondsContext");
  return context;
};

export default useDiamondsContext;
