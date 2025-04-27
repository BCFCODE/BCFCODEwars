import { Dispatch, useContext } from "react";
import { CodewarsDispatchContext } from "../../providers/Codewars";
import { CodewarsAction } from "../../reducers/codewarsReducer";

const useCodewarsDispatchContext = (): Dispatch<CodewarsAction> => {
  const context = useContext(CodewarsDispatchContext);
  if (!context) {
    throw new Error(
      "useCodewarsDispatchContext must be used within a CodewarsDispatchContextProvider"
    );
  }
  return context;
};

export default useCodewarsDispatchContext;
