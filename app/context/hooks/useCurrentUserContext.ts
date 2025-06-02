import { useContext } from "react";
import { CurrentUserContext } from "../providers/contexts";
import { CurrentUserContext as CurrentUserContextType } from "../reducers/currentUser";

const useCurrentUserContext = (): CurrentUserContextType => {
  const context = useContext(CurrentUserContext);
  if (!context) {
    throw new Error(
      "useCurrentUserContext must be used within a CurrentUserContextProvider"
    );
  }
  return context;
};

export default useCurrentUserContext;
