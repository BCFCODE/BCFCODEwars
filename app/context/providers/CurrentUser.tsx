import { ReactNode, useReducer } from "react";
import currentUserReducer, {
  CurrentUserContext as CurrentUserContextType,
} from "../reducers/currentUserReducer";
import { CurrentUserContext, CurrentUserDispatchContext } from "./contexts";

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
