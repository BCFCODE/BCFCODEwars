import useCodewarsDispatchContext from "@/app/context/hooks/codewars/useCodewarsDispatchContext";
import useAllUsersDispatchContext from "@/app/context/hooks/db/useAllUsersDispatchContext";
import useCurrentUserContext from "@/app/context/hooks/db/useCurrentUserContext";
import useCurrentUserDispatchContext from "@/app/context/hooks/db/useCurrentUserDispatchContext";
import { useEffect } from "react";

const useDispatchActions = () => {
  const { isCollapsed, currentUser } = useCurrentUserContext();
  const allUsersDispatch = useAllUsersDispatchContext();
  const currentUserDispatch = useCurrentUserDispatchContext();
  const codewarsDispatch = useCodewarsDispatchContext();

  // useEffect(() => {
  //   const isListUpdatedAndUserCollapsedTheTable =
  //     isCollapsed &&
  //     "untrackedChallenges" in currentUser.codewars.codeChallenges;
  //   if (isListUpdatedAndUserCollapsedTheTable) {
  //     console.log("useDispatchActions/currentUser", currentUser);
  //     allUsersDispatch({ type: "UPDATE_CURRENT_USER", currentUser });
  //   }
  // }, [currentUser, isCollapsed, allUsersDispatch]);

  const dispatchActions = () => {
    allUsersDispatch({ type: "UPDATE_CURRENT_USER", currentUser });
    currentUserDispatch({
      type: "SET_COLLAPSE_OPEN",
      isCollapsed: !isCollapsed,
    });
    codewarsDispatch({ type: "SET_LOADING", isLoading: true });
  };

  return { dispatchActions };
};

export default useDispatchActions;
