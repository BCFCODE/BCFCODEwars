import { ICodewarsContext } from "@/types/contexts";
import { createContext, ReactNode } from "react";

// Props for the provider component
interface Props {
  children: ReactNode;
  context: ICodewarsContext;
}

export const CodewarsContext = createContext<ICodewarsContext | null>(null);

const CodewarsProvider = ({ children, context }: Props) => {
  return (
    <CodewarsContext.Provider value={context}>
      {children}
    </CodewarsContext.Provider>
  );
};

export default CodewarsProvider;
