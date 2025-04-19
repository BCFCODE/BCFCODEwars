import dbAPIService from "@/app/api/services/db";
import useCodewarsDispatchContext from "@/app/context/hooks/codewars/useCodewarsDispatchContext";
import useAllUsersDispatchContext from "@/app/context/hooks/db/useAllUsersDispatchContext";
import useCurrentUserContext from "@/app/context/hooks/db/useCurrentUserContext";
import useCurrentUserDispatchContext from "@/app/context/hooks/db/useCurrentUserDispatchContext";
import { useUsersStore } from "@/app/store/users";
import { useEffect } from "react";

const { postCurrentUser } = new dbAPIService();

const useDispatchActions = () => {
  const { updateCurrentUser } = useUsersStore((s) => s.actions);
  const { isCollapsed, currentUser } = useCurrentUserContext();
  const allUsersDispatch = useAllUsersDispatchContext();
  const currentUserDispatch = useCurrentUserDispatchContext();
  const codewarsDispatch = useCodewarsDispatchContext();

  let untrackedChallengesAvailable =
    currentUser.codewars.codeChallenges?.untrackedChallengesAvailable ?? false;
  // useMemo(() => {
  //   return (
  //     currentUser.codewars.codeChallenges?.untrackedChallengesAvailable ?? false
  //   );
  // }, [currentUser]);

  useEffect(() => {
    if (isCollapsed && untrackedChallengesAvailable) {
      // console.log(
      //   "useDispatchActions/hasUntrackedChallengesWhenCollapsed/currentUser",
      //   currentUser,
      //   untrackedChallengesAvailable
      // );
      allUsersDispatch({ type: "UPDATE_CURRENT_USER", currentUser });
      updateCurrentUser(currentUser);
      // (async () => {
      //   const { success } = await postCurrentUser(currentUser);
      //   if (success) untrackedChallengesAvailable = false;
      // })();

      postCurrentUser(currentUser);

      currentUserDispatch({
        type: "CHECK_UNTRACKED_CHALLENGES_AVAILABILITY",
        untrackedChallengesAvailable: false,
      });
    }
  }, [
    currentUser,
    isCollapsed,
    allUsersDispatch,
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
