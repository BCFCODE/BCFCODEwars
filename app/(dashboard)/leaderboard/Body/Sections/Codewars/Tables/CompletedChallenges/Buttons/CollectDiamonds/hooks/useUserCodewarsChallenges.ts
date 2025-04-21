import useCurrentUserDispatchContext from "@/app/context/hooks/db/useCurrentUserDispatchContext";
import { CurrentUserAction } from "@/app/context/reducers/currentUser";
import { Dispatch } from "react";

export interface UseUserCodewarsChallenges {
  currentUserDispatch: Dispatch<CurrentUserAction>;
}

const useUserCodewarsChallenges = (): UseUserCodewarsChallenges => {
  const currentUserDispatch = useCurrentUserDispatchContext();

  return {
    currentUserDispatch,
  };
};

export default useUserCodewarsChallenges;
