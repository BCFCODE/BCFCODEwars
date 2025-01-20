import { useContext } from "react";
import { DatabaseUserContext } from "../DatabaseUserProvider";
import { IDatabaseUserProvider } from "@/types/contexts";

const useDatabaseUserContext = (): IDatabaseUserProvider => {
  const context = useContext(DatabaseUserContext);
  if (!context) {
    throw new Error(
      "useDatabaseUserContext must be used within a useDatabaseUserContext"
    );
  }
  return context;
};

export default useDatabaseUserContext;
