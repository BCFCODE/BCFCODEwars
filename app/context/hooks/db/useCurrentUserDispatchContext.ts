import { Dispatch, useContext } from "react";
import { CurrentUserDispatchContext } from "../../providers/CurrentUser";
import { CurrentUserAction } from "../../reducers/currentUserReducer";

const useCurrentUserDispatchContext = (): Dispatch<CurrentUserAction> => {
  const context = useContext(CurrentUserDispatchContext);
  if (!context) {
    throw new Error(
      "useCurrentUserDispatchContext must be used within a CurrentUserDispatchContextProvider"
    );
  }
  return context;
};

export default useCurrentUserDispatchContext;
