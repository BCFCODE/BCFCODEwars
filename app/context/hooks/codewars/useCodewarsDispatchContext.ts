import { Dispatch, useContext } from "react";
import { CodewarsDispatchContext } from "../../providers/codewars/CodewarsProvider";
import { CodewarsAction } from "../../reducers/codewars/types";

const useCodewarsDispatchContext = (): Dispatch<CodewarsAction> => {
  const context = useContext(CodewarsDispatchContext);
  if (!context) {
    throw new Error(
      "useCodewarsDispatchContext must be used within a CodewarsProvider"
    );
  }
  return context;
};

export default useCodewarsDispatchContext;
