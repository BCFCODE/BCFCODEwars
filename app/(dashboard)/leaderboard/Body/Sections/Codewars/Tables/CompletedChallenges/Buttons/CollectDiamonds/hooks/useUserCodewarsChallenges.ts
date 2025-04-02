import useAllUsersDispatchContext from "@/app/context/hooks/db/useAllUsersDispatchContext";
import useCurrentUserContext from "@/app/context/hooks/db/useCurrentUserContext";
import useCurrentUserDispatchContext from "@/app/context/hooks/db/useCurrentUserDispatchContext";
import { AllUsersAction } from "@/app/context/reducers/allUsersReducer";
import { CurrentUserAction } from "@/app/context/reducers/currentUserReducer";
import { AuthenticatedUser } from "@/types/users";
import { Dispatch } from "react";

export interface UseUserCodewarsChallenges {
  currentUser: AuthenticatedUser;
  allUsersDispatch: Dispatch<AllUsersAction>;
  currentUserDispatch: Dispatch<CurrentUserAction>;
}

const useUserCodewarsChallenges = (): UseUserCodewarsChallenges => {
  const { currentUser } = useCurrentUserContext();
  const currentUserDispatch = useCurrentUserDispatchContext();
  const allUsersDispatch = useAllUsersDispatchContext();

  return {
    allUsersDispatch,
    currentUser,
    currentUserDispatch,
  };
};

export default useUserCodewarsChallenges;
