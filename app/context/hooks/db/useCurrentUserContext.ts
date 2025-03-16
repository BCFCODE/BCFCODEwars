import { useContext } from "react";
import { CurrentUserContextState } from "../../providers/db/currentUser/types";
import { CurrentUserContext } from "../../providers/db/currentUser/dbCurrentUserProvider";

const useCurrentUserContext = (): CurrentUserContextState => {
  const context = useContext(CurrentUserContext);
  if (!context) {
    throw new Error(
      "useCurrentUserContext must be used within a useCurrentUserContext"
    );
  }
  return context;
};

export default useCurrentUserContext;
