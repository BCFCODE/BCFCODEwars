import { useContext } from "react";
import { CurrentUserContext } from "../../providers/CurrentUser";
import { CurrentUserContext as Context } from "../../reducers/currentUserReducer";

const useCurrentUserContext = (): Context => {
  const context = useContext(CurrentUserContext);
  if (!context) {
    throw new Error(
      "useCurrentUserContext must be used within a CurrentUserContextProvider"
    );
  }
  return context;
};

export default useCurrentUserContext;
