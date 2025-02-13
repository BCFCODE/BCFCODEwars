import { Dispatch, useContext } from "react";
import { DBCurrentUserDispatchContext } from "../providers/db/currentUser/dbCurrentUserProvider";
import { Action } from "../reducers/users/currentUser/types";

const useDBCurrentUserDispatchContext = (): Dispatch<Action> => {
  const context = useContext(DBCurrentUserDispatchContext);
  if (!context) {
    throw new Error(
      "useDBCurrentUserDispatchContext must be used within a useDBCurrentUserDispatchContext"
    );
  }
  return context;
};

export default useDBCurrentUserDispatchContext;
