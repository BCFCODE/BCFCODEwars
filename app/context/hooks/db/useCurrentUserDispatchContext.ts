import { Dispatch, useContext } from "react";
import { CurrentUserActionContext } from "../../providers/CurrentUser";
import { CurrentUserAction } from "../../reducers/currentUserReducer";

const useCurrentUserDispatchContext = (): Dispatch<CurrentUserAction> => {
  const context = useContext(CurrentUserActionContext);
  if (!context) {
    throw new Error(
      "useCurrentUserDispatchContext must be used within a useCurrentUserDispatchContext"
    );
  }
  return context;
};

export default useCurrentUserDispatchContext;
