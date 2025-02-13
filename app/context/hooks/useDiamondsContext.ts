import { useContext } from "react";
import { DiamondsContext } from "../providers/diamonds/DiamondsProvider";
import { DiamondsState } from "../providers/diamonds/types";

const useDiamondsContext = (): DiamondsState => {
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
