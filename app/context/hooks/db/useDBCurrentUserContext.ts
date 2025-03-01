import { useContext } from "react";
import { CurrentUserContextState } from "../../providers/db/currentUser/types";
import { CurrentUserContext } from "../../providers/db/currentUser/dbCurrentUserProvider";

const useDBCurrentUserContext = (): CurrentUserContextState => {
  const context = useContext(CurrentUserContext);
  if (!context) {
    throw new Error(
      "useDBCurrentUserContext must be used within a useDBCurrentUserContext"
    );
  }
  return context;
};

export default useDBCurrentUserContext;
