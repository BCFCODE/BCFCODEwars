import { Dispatch, useContext } from "react";
import { CurrentUserAction } from "../../reducers/currentUser";
import { CurrentUserDispatchContext } from "../../providers/contexts";

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
