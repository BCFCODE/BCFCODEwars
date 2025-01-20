import { IDatabaseUserProvider } from "@/types/contexts";
import { createContext, ReactNode } from "react";

interface Props {
  children: ReactNode;
  context: IDatabaseUserProvider;
}

export const DatabaseUserContext = createContext<IDatabaseUserProvider | null>(
  null
);

const DatabaseUserProvider = ({ children, context }: Props) => {
  return (
    <DatabaseUserContext.Provider value={context}>
      {children}
    </DatabaseUserContext.Provider>
  );
};

export default DatabaseUserProvider;
