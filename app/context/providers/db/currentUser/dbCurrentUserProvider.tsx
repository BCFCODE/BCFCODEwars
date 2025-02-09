import { createContext, Dispatch, ReactNode, useReducer } from "react";
import dbCurrentUserReducer from "../../../reducers/users/currentUser/dbCurrentUserReducer";
import { Action } from "../../../reducers/users/currentUser/types";
import { CurrentUserContextType } from "./types";

interface Props {
  children: ReactNode;
  context: CurrentUserContextType;
}

// const initialCurrentUserState: DBUser = {};

export const DBCurrentUserContext =
  createContext<CurrentUserContextType | null>(null);
export const DBCurrentUserDispatchContext =
  createContext<Dispatch<Action> | null>(null);

const DBCurrentUserProvider = ({ children, context }: Props) => {
  const [currentUserContext, dispatch] = useReducer(
    dbCurrentUserReducer,
    context
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
