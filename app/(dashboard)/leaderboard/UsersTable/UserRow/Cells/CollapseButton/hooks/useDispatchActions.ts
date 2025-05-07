import dbAPIService from "@/app/api/services/db";
import useCurrentUserContext from "@/app/context/hooks/db/useCurrentUserContext";
import useCurrentUserDispatchContext from "@/app/context/hooks/db/useCurrentUserDispatchContext";
import { useUsersStore } from "@/app/context/store/users";
import { useEffect } from "react";

const { postCurrentUser } = new dbAPIService();

const useDispatchActions = () => {
  const { setSelectedUser } = useUsersStore((state) => state);
  const { isCollapsed, currentUser } = useCurrentUserContext();
  const currentUserDispatch = useCurrentUserDispatchContext();
  // const codewarsDispatch = useCodewarsDispatchContext();

  const untrackedChallengesAvailable =
    currentUser.codewars?.codeChallenges?.untrackedChallengesAvailable ?? false;

  useEffect(() => {
    if (isCollapsed && untrackedChallengesAvailable) {
      setSelectedUser(currentUser);

      postCurrentUser(currentUser);

      currentUserDispatch({
        type: "CHECK_UNTRACKED_CHALLENGES_AVAILABILITY",
        untrackedChallengesAvailable: false,
      });
    }
  }, [
    currentUser,
    setSelectedUser,
    isCollapsed,
    untrackedChallengesAvailable,
    currentUserDispatch,
  ]);

  const dispatchActions = () => {
    currentUserDispatch({
      type: "SET_COLLAPSE_OPEN",
      isCollapsed: !isCollapsed,
    });
    // codewarsDispatch({ type: "SET_LOADING", isLoading: false });
  };

  return { dispatchActions };
};

export default useDispatchActions;
