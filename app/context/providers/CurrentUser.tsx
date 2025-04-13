import { ReactNode, useReducer } from "react";
import currentUserReducer, {
  CurrentUserContext as CurrentUserContextType,
} from "../reducers/currentUser";
import { CurrentUserContext, CurrentUserDispatchContext } from "./contexts";

interface Props {
  children: ReactNode;
  context: CurrentUserContextType;
}

const CurrentUserProvider = ({ children, context }: Props) => {
  const initialCurrentUserState: CurrentUserContextType = {
    ...context,
    isCollapsed: false,
    // untrackedChallengesAvailable: false,
  };
  const [state, dispatch] = useReducer(
    currentUserReducer,
    initialCurrentUserState
  );
  // console.log(context, "<<<<<<<<< CurrentUserProvider");
  return (
    <CurrentUserContext.Provider value={state}>
      <CurrentUserDispatchContext.Provider value={dispatch}>
        {children}
      </CurrentUserDispatchContext.Provider>
    </CurrentUserContext.Provider>
  );
};

export default CurrentUserProvider;
