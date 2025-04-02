import { createContext, Dispatch, ReactNode, useReducer } from "react";
import currentUserReducer, {
  CurrentUserAction,
  CurrentUserContext as CurrentUserContextType,
} from "../reducers/currentUserReducer";

export const CurrentUserContext = createContext<CurrentUserContextType | null>(
  null
);
export const CurrentUserDispatchContext =
  createContext<Dispatch<CurrentUserAction> | null>(null);

interface Props {
  children: ReactNode;
  context: CurrentUserContextType;
}

const CurrentUserProvider = ({ children, context }: Props) => {
  const initialCurrentUserState: CurrentUserContextType = {
    ...context,
    isCollapsed: false,
  };
  const [currentUserContext, dispatch] = useReducer(
    currentUserReducer,
    initialCurrentUserState
  );
  // console.log(context, "<<<<<<<<< CurrentUserProvider");
  return (
    <CurrentUserContext.Provider value={currentUserContext}>
      <CurrentUserDispatchContext.Provider value={dispatch}>
        {children}
      </CurrentUserDispatchContext.Provider>
    </CurrentUserContext.Provider>
  );
};

export default CurrentUserProvider;
