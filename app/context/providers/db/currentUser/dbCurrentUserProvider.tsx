import { createContext, Dispatch, ReactNode, useReducer } from "react";
import dbCurrentUserReducer from "../../../reducers/users/currentUser/dbCurrentUserReducer";
import { Action } from "../../../reducers/users/currentUser/types";
import { CurrentUserContextState } from "./types";

interface Props {
  children: ReactNode;
  context: CurrentUserContextState;
}

export const DBCurrentUserContext =
  createContext<CurrentUserContextState | null>(null);
export const DBCurrentUserDispatchContext =
  createContext<Dispatch<Action> | null>(null);

const DBCurrentUserProvider = ({ children, context }: Props) => {
  const initialCurrentUserState: CurrentUserContextState = {
    ...context,
    isCollapse: false,
  };
  const [currentUserContext, dispatch] = useReducer(
    dbCurrentUserReducer,
    initialCurrentUserState
  );
  console.log(context, "<<<<<<<<< DBCurrentUserProvider");
  return (
    <DBCurrentUserContext.Provider value={currentUserContext}>
      <DBCurrentUserDispatchContext.Provider value={dispatch}>
        {children}
      </DBCurrentUserDispatchContext.Provider>
    </DBCurrentUserContext.Provider>
  );
};

export default DBCurrentUserProvider;
