import { ICodewarsContext } from "@/types/contexts";
import { createContext, ReactNode, useReducer } from "react";
import codewarsReducer from "./reducers/codewars";

// Props for the provider component
interface Props {
  children: ReactNode;
  context: ICodewarsContext;
}

// const initialCodewars = {}

export const CodewarsContext = createContext<ICodewarsContext | null>(null);
// export const CodewarsDispatchContext = createContext(null);

const CodewarsProvider = ({ children, context }: Props) => {
  // const [codewars, dispatch] = useReducer(codewarsReducer, initialCodewars);

  return (
    <CodewarsContext.Provider value={context}>
      {/* <CodewarsDispatchContext.Provider value={dispatch}> */}
        {children}
      {/* </CodewarsDispatchContext.Provider> */}
    </CodewarsContext.Provider>
  );
};

export default CodewarsProvider;
