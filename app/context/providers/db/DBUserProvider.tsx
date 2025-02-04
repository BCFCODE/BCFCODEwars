import { IDBUserProvider } from "@/types/contexts";
import { createContext, ReactNode } from "react";

interface Props {
  children: ReactNode;
  context: IDBUserProvider;
}

export const DBUserContext = createContext<IDBUserProvider | null>(null);

const DBUserProvider = ({ children, context }: Props) => {
  return (
    <DBUserContext.Provider value={context}>{children}</DBUserContext.Provider>
  );
};

export default DBUserProvider;
