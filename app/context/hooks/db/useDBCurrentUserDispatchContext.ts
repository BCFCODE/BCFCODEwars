import { Dispatch, useContext } from "react";
import { Action } from "../../reducers/users/currentUser/types";
import { CurrentUserDispatchContext } from "../../providers/db/currentUser/dbCurrentUserProvider";

const useDBCurrentUserDispatchContext = (): Dispatch<Action> => {
  const context = useContext(CurrentUserDispatchContext);
  if (!context) {
    throw new Error(
      "useDBCurrentUserDispatchContext must be used within a useDBCurrentUserDispatchContext"
    );
  }
  return context;
};

export default useDBCurrentUserDispatchContext;
