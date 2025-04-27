import { useContext } from "react";
import { CurrentUserContext as CurrentUserContextType } from "../../reducers/currentUser";
import { CurrentUserContext } from "../../providers/contexts";

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
