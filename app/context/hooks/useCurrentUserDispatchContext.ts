import { Dispatch, useContext } from "react";
import { CurrentUserDispatchContext } from "../providers/contexts";
import { CurrentUserAction } from "../reducers/currentUser";

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
