import { Dispatch, useContext } from "react";
import { CodewarsDispatchContext } from "../../providers/codewars/CodewarsProvider";
import { CodewarsContextAction } from "../../reducers/codewars/types";

const useCodewarsDispatchContext = (): Dispatch<CodewarsContextAction> => {
  const context = useContext(CodewarsDispatchContext);
  if (!context) {
    throw new Error(
      "useCodewarsDispatchContext must be used within a CodewarsProvider"
    );
  }
  return context;
};

export default useCodewarsDispatchContext;
