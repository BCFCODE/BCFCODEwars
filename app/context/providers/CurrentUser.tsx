import { createContext, Dispatch, ReactNode, useReducer } from "react";
import currentUserReducer, {
  CurrentUserAction,
} from "../reducers/currentUserReducer";
import { CurrentUser } from "@/types/users";
import { CodewarsCompletedChallenge } from "@/types/codewars";

export type CurrentUserContext = {
  currentUser: CurrentUser;
};

export interface CurrentUserContextState extends CurrentUserContext {
  isCollapsed?: boolean;
  // untrackedChallenges: CodewarsCompletedChallenge[];
}

export const CurrentUserContext = createContext<CurrentUserContextState | null>(
  null
);
export const CurrentUserDispatchContext =
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
