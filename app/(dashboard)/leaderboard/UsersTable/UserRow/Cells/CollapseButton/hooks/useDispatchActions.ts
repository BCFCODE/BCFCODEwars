import dbAPIService from "@/app/api/services/db";
import useCurrentUserContext from "@/app/context/hooks/db/useCurrentUserContext";
import useCurrentUserDispatchContext from "@/app/context/hooks/db/useCurrentUserDispatchContext";
import { useUsersStore } from "@/app/context/store/users";
import { useEffect } from "react";
import usePaginationStore from "../CodewarsTable/Pagination/usePaginationStore";

const { postCurrentUser } = new dbAPIService();

const useDispatchActions = () => {
  // const { setPagination } = usePaginationStore((state) => state);
  const { setSelectedUser } = useUsersStore((state) => state);
  const isCollapsed = useUsersStore(
    (state) => state.user.selectedUser?.isCollapsed
  );
  const { currentUser } = useCurrentUserContext();
  const currentUserDispatch = useCurrentUserDispatchContext();
  // const codewarsDispatch = useCodewarsDispatchContext();

  const untrackedChallengesAvailable =
    currentUser.codewars?.codeChallenges?.untrackedChallengesAvailable ?? false;

  useEffect(() => {
    if (isCollapsed === false && untrackedChallengesAvailable) {
      setSelectedUser({ ...currentUser, isCollapsed: false });

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
    // currentUserDispatch({
    //   type: "SET_COLLAPSE_OPEN",
    //   isCollapsed: !isCollapsed,
    // });

    // setIsCollapsed(!isCollapsed);

    setSelectedUser({ ...currentUser, isCollapsed: !Boolean(isCollapsed) });
  };

  return { dispatchActions };
};

export default useDispatchActions;
