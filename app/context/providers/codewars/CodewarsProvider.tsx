import { CodewarsContextState } from "@/types/contexts";
import { createContext, Dispatch, ReactNode, useReducer } from "react";
import codewarsReducer from "../../reducers/codewars/codewarsReducer";
import { Action } from "../../reducers/codewars/types";

interface Props {
  children: ReactNode;
  // context: CodewarsContextState;
}

const initialCodewars: CodewarsContextState = {
  completedChallenges: [],
  isError: false,
  isLoading: false,
  pageNumber: 0
};

export const CodewarsContext = createContext<CodewarsContextState | null>(null);
export const CodewarsDispatchContext = createContext<Dispatch<Action> | null>(
  null
);

const CodewarsProvider = ({ children }: Props) => {
  const [codewarsState, dispatch] = useReducer(
    codewarsReducer,
    initialCodewars
  );

  return (
    <CodewarsContext.Provider value={codewarsState}>
      <CodewarsDispatchContext.Provider value={dispatch}>
        {children}
      </CodewarsDispatchContext.Provider>
    </CodewarsContext.Provider>
  );
};

export default CodewarsProvider;
