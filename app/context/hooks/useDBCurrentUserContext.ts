import { useContext } from "react";
import { CurrentUserContextState } from "../providers/db/currentUser/types";
import { DBCurrentUserContext } from "../providers/db/currentUser/dbCurrentUserProvider";

const useDBCurrentUserContext = (): CurrentUserContextState => {
  const context = useContext(DBCurrentUserContext);
  if (!context) {
    throw new Error(
      "useDBCurrentUserContext must be used within a useDBCurrentUserContext"
    );
  }
  return context;
};

export default useDBCurrentUserContext;
