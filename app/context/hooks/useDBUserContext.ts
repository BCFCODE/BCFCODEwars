import { useContext } from "react";
import { IDBUserProvider } from "@/types/contexts";
import { DBUserContext } from "../providers/db/DBUserProvider";

const useDBUserContext = (): IDBUserProvider => {
  const context = useContext(DBUserContext);
  if (!context) {
    throw new Error("useDBUserContext must be used within a useDBUserContext");
  }
  return context;
};

export default useDBUserContext;
