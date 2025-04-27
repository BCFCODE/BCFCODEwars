import dbAPIService from "@/app/api/services/db";
import useCodewarsDispatchContext from "@/app/context/hooks/codewars/useCodewarsDispatchContext";
import useCurrentUserContext from "@/app/context/hooks/db/useCurrentUserContext";
import useCurrentUserDispatchContext from "@/app/context/hooks/db/useCurrentUserDispatchContext";
import { useUsersStore } from "@/app/store/users";
import { useEffect } from "react";

const { postCurrentUser } = new dbAPIService();

const useDispatchActions = () => {
  const { setCurrentUser } = useUsersStore((s) => s.actions);
  const { isCollapsed, currentUser } = useCurrentUserContext();
  const currentUserDispatch = useCurrentUserDispatchContext();
  const codewarsDispatch = useCodewarsDispatchContext();

  let untrackedChallengesAvailable =
    currentUser.codewars?.codeChallenges?.untrackedChallengesAvailable ?? false;

  useEffect(() => {
    if (isCollapsed && untrackedChallengesAvailable) {
      setCurrentUser(currentUser);

      postCurrentUser(currentUser);

      currentUserDispatch({
        type: "CHECK_UNTRACKED_CHALLENGES_AVAILABILITY",
        untrackedChallengesAvailable: false,
      });
    }
  }, [
    currentUser,
    setCurrentUser,
    isCollapsed,
    untrackedChallengesAvailable,
    currentUserDispatch,
  ]);

  const dispatchActions = () => {
    currentUserDispatch({
      type: "SET_COLLAPSE_OPEN",
      isCollapsed: !isCollapsed,
    });
    codewarsDispatch({ type: "SET_LOADING", isLoading: true });
  };

  return { dispatchActions };
};

export default useDispatchActions;
