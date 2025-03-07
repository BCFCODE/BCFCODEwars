import { createContext, Dispatch, ReactNode, useReducer } from "react";
import dbCurrentUserReducer from "../../../reducers/users/currentUser/dbCurrentUserReducer";
import { CurrentUserAction } from "../../../reducers/users/currentUser/types";
import { CurrentUserContextState } from "./types";

export const CurrentUserContext = createContext<CurrentUserContextState | null>(
  null
);
export const CurrentUserActionContext =
  createContext<Dispatch<CurrentUserAction> | null>(null);

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
      <CurrentUserActionContext.Provider value={dispatch}>
        {children}
      </CurrentUserActionContext.Provider>
    </CurrentUserContext.Provider>
  );
};

export default CurrentUserProvider;
