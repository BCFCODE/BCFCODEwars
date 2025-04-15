import dbAPIService from "@/app/api/services/db";
import useCodewarsDispatchContext from "@/app/context/hooks/codewars/useCodewarsDispatchContext";
import { useLeaderBoardStore } from "@/app/store/leaderboard";
import { useUsersStore } from "@/app/store/users";
import { AuthenticatedUser } from "@/types/users";
import { useEffect } from "react";

const { postCurrentUser } = new dbAPIService();

const useDispatchActions = () => {
  const {
    currentUser,
    actions: { checkUntrackedChallengesAvailability },
  } = useUsersStore((state) => state);
  const {
    currentUser: { isCollapsed },
    actions: { setIsCollapsed },
  } = useLeaderBoardStore((state) => state);

  const codewarsDispatch = useCodewarsDispatchContext();
  const { updateCurrentUser } = useUsersStore((s) => s.actions);

  let untrackedChallengesAvailable =
    currentUser?.codewars.codeChallenges?.untrackedChallengesAvailable ?? false;

  useEffect(() => {
    if (isCollapsed && untrackedChallengesAvailable && currentUser) {
      updateCurrentUser(currentUser);

      postCurrentUser(currentUser);

      checkUntrackedChallengesAvailability(false);
    }
  }, [
    currentUser,
    isCollapsed,
    untrackedChallengesAvailable,
    checkUntrackedChallengesAvailability,
  ]);

  const dispatchActions = () => {
    setIsCollapsed(!isCollapsed);
    codewarsDispatch({ type: "SET_LOADING", isLoading: true });
  };

  return { dispatchActions };
};

export default useDispatchActions;
