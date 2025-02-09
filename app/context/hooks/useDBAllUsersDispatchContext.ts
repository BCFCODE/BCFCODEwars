import { useContext } from "react";
import { DBAllUsersDispatchContext } from "../providers/db/allUsers/dbAllUsersProvider";
import { Dispatch } from "react";
import { Action } from "../reducers/users/allUsers/types";

const useDBAllUsersDispatchContext = (): Dispatch<Action> => {
  const context = useContext(DBAllUsersDispatchContext);
  if (!context) {
    throw new Error(
      "useDBAllUsersDispatchContext must be used within a DBAllUsersProvider"
    );
  }
  return context;
};

export default useDBAllUsersDispatchContext;
