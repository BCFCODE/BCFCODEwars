import { createContext, Dispatch, ReactNode, useReducer } from "react";
import dbCurrentUserReducer from "../../../reducers/users/currentUser/dbCurrentUserReducer";
import { Action } from "../../../reducers/users/currentUser/types";
import { CurrentUserContextState } from "./types";

export const CurrentUserContext = createContext<CurrentUserContextState | null>(
  null
);
export const CurrentUserDispatchContext =
  createContext<Dispatch<Action> | null>(null);

const CurrentUserProvider = ({
  children,
  context,
}: {
  children: ReactNode;
  context: CurrentUserContextState;
}) => {
  const initialCurrentUserState: CurrentUserContextState = {
    ...context,
    isCollapse: false,
  };
  const [currentUserContext, dispatch] = useReducer(
    dbCurrentUserReducer,
    initialCurrentUserState
  );
  console.log(context, "<<<<<<<<< CurrentUserProvider");
  return (
    <CurrentUserContext.Provider value={currentUserContext}>
      <CurrentUserDispatchContext.Provider value={dispatch}>
        {children}
      </CurrentUserDispatchContext.Provider>
    </CurrentUserContext.Provider>
  );
};

export default CurrentUserProvider;
