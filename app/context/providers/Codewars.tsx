import { createContext, Dispatch, ReactNode, useReducer } from "react";
import codewarsReducer, { CodewarsAction } from "../reducers/codewarsReducer";

import { CodewarsCompletedChallenge, CodewarsUser } from "@/types/codewars";

export interface Context {}

export interface CodewarsState extends Context {
  codewarsUsers?: CodewarsUser[];
  completedChallenges?: CodewarsCompletedChallenge[];
  selectedChallenge?: CodewarsCompletedChallenge;
  pageNumber: number;
  isDisabled: boolean;
  isError: boolean;
  isLoading: boolean;
  // fetchCompletedChallenges: () => void;
}

interface Props {
  children: ReactNode;
  // context: CodewarsState;
}

const initialCodewars: CodewarsState = {
  completedChallenges: [],
  isDisabled: false,
  isError: false,
  isLoading: false,
  pageNumber: 0,
};

export const CodewarsContext = createContext<CodewarsState | null>(null);
export const CodewarsDispatchContext =
  createContext<Dispatch<CodewarsAction> | null>(null);

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
