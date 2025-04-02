import { useContext } from "react";
import { CurrentUserContext as Context } from "../../reducers/currentUserReducer";
import { CurrentUserContext } from "../../providers/contexts";

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
