import { useContext } from "react";
import { CurrentUserContextType } from "../providers/db/currentUser/types";
import { DBCurrentUserContext } from "../providers/db/currentUser/dbCurrentUserProvider";

const useDBCurrentUserContext = (): CurrentUserContextType => {
  const context = useContext(DBCurrentUserContext);
  if (!context) {
    throw new Error(
      "useDBCurrentUserContext must be used within a useDBCurrentUserContext"
    );
  }
  return context;
};

export default useDBCurrentUserContext;
