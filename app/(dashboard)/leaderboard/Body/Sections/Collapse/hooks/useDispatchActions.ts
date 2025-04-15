import dbAPIService from "@/app/api/services/db";
import useCodewarsDispatchContext from "@/app/context/hooks/codewars/useCodewarsDispatchContext";
import useCurrentUserContext from "@/app/context/hooks/db/useCurrentUserContext";
import useCurrentUserDispatchContext from "@/app/context/hooks/db/useCurrentUserDispatchContext";
import { useUsersStore } from "@/app/store/users";
import { useEffect } from "react";

const { postCurrentUser } = new dbAPIService();

const useDispatchActions = () => {
  const { isCollapsed, currentUser } = useCurrentUserContext();
  const currentUserDispatch = useCurrentUserDispatchContext();
  const codewarsDispatch = useCodewarsDispatchContext();
  const { updateCurrentUser } = useUsersStore((s) => s.actions);

  let untrackedChallengesAvailable =
    currentUser.codewars.codeChallenges?.untrackedChallengesAvailable ?? false;

  useEffect(() => {
    if (isCollapsed && untrackedChallengesAvailable) {
      updateCurrentUser(currentUser);

      postCurrentUser(currentUser);

      currentUserDispatch({
        type: "CHECK_UNTRACKED_CHALLENGES_AVAILABILITY",
        untrackedChallengesAvailable: false,
      });
    }
  }, [
    currentUser,
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
