import { useContext } from "react";
import {
  CurrentUserContext,
  CurrentUserContextState,
} from "../../providers/CurrentUser";

const useCurrentUserContext = (): CurrentUserContextState => {
  const context = useContext(CurrentUserContext);
  if (!context) {
    throw new Error(
      "useCurrentUserContext must be used within a CurrentUserContextProvider"
    );
  }
  return context;
};

export default useCurrentUserContext;
