import useAllUsersDispatchContext from "@/app/context/hooks/db/useAllUsersDispatchContext";
import useCurrentUserDispatchContext from "@/app/context/hooks/db/useCurrentUserDispatchContext";
import { AllUsersAction } from "@/app/context/reducers/allUsersReducer";
import { CurrentUserAction } from "@/app/context/reducers/currentUserReducer";
import { Dispatch } from "react";

export interface UseUserCodewarsChallenges {
  allUsersDispatch: Dispatch<AllUsersAction>;
  currentUserDispatch: Dispatch<CurrentUserAction>;
}

const useUserCodewarsChallenges = (): UseUserCodewarsChallenges => {
  const currentUserDispatch = useCurrentUserDispatchContext();
  const allUsersDispatch = useAllUsersDispatchContext();

  return {
    allUsersDispatch,
    currentUserDispatch,
  };
};

export default useUserCodewarsChallenges;
