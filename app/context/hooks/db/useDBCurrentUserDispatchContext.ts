import { Dispatch, useContext } from "react";
import { CurrentUserAction } from "../../reducers/users/currentUser/types";
import { CurrentUserActionContext } from "../../providers/db/currentUser/dbCurrentUserProvider";

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
