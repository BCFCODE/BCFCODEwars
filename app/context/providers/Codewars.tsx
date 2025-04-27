import { createContext, Dispatch, ReactNode, useReducer } from "react";
import codewarsReducer, {
  CodewarsAction,
  CodewarsState,
  initialCodewars,
} from "../reducers/codewarsReducer";

export const CodewarsContext = createContext<CodewarsState | null>(null);
export const CodewarsDispatchContext =
  createContext<Dispatch<CodewarsAction> | null>(null);

interface Props {
  children: ReactNode;
}

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
