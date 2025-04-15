import { useCurrentUser } from "@/app/(dashboard)/leaderboard/context/CurrentUser";
import dbAPIService from "@/app/api/services/db";
import useCodewarsDispatchContext from "@/app/context/hooks/codewars/useCodewarsDispatchContext";
import { useUsersStore } from "@/app/store/users";
import { useEffect } from "react";

const { postCurrentUser } = new dbAPIService();

const useDispatchActions = () => {
  const currentUser = useCurrentUser();
  
  const {
    actions: {
      checkUntrackedChallengesAvailability,
      setIsCollapsed,
      updateCurrentUser,
    },
  } = useUsersStore((state) => state);

  const codewarsDispatch = useCodewarsDispatchContext();

  let untrackedChallengesAvailable =
    currentUser?.codewars.codeChallenges?.untrackedChallengesAvailable ?? false;

  useEffect(() => {
    if (currentUser && untrackedChallengesAvailable) {
      updateCurrentUser(currentUser);

      postCurrentUser(currentUser);

      checkUntrackedChallengesAvailability(false);
    }
  }, [
    currentUser,
    currentUser?.isCollapsed,
    untrackedChallengesAvailable,
    checkUntrackedChallengesAvailability,
    updateCurrentUser
  ]);

  const dispatchActions = () => {
    setIsCollapsed(!currentUser.isCollapsed);
    codewarsDispatch({ type: "SET_LOADING", isLoading: true });
  };

  return { dispatchActions };
};

export default useDispatchActions;
