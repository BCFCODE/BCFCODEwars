import { AuthenticatedUser } from "@/types/users";
import { createContext, Dispatch, ReactNode, useReducer } from "react";
import currentUserReducer, {
  CurrentUserAction,
} from "../reducers/currentUserReducer";
import { Session } from "next-auth";

export interface CurrentUserState {
  session?: Session;
  isCollapsed?: boolean;
  // untrackedChallenges: CodewarsCompletedChallenge[];
}

export interface CurrentUserContext extends CurrentUserState {
  currentUser: AuthenticatedUser;
}

export const CurrentUserContext = createContext<CurrentUserContext | null>(null);
export const CurrentUserDispatchContext =
  createContext<Dispatch<CurrentUserAction> | null>(null);

const CurrentUserProvider = ({
  children,
  context,
}: {
  children: ReactNode;
  context: CurrentUserContext;
}) => {
  const initialCurrentUserState: CurrentUserContext = {
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
