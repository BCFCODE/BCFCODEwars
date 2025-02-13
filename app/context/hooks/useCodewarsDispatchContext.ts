import { Dispatch, useContext } from "react";
import { CodewarsDispatchContext } from "../providers/codewars/CodewarsProvider";
import { Action } from "../reducers/codewars/types";

const useCodewarsDispatchContext = (): Dispatch<Action> => {
  const context = useContext(CodewarsDispatchContext);
  if (!context) {
    throw new Error(
      "useCodewarsDispatchContext must be used within a CodewarsProvider"
    );
  }
  return context;
};

export default useCodewarsDispatchContext;
