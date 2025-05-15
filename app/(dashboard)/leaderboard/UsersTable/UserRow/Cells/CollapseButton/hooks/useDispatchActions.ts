import dbAPIService from "@/app/api/services/db";
import useCurrentUserContext from "@/app/context/hooks/db/useCurrentUserContext";
import useCurrentUserDispatchContext from "@/app/context/hooks/db/useCurrentUserDispatchContext";
import { useUsersStore } from "@/app/context/store/users";
import { useEffect } from "react";

const { postCurrentUser } = new dbAPIService();

const useDispatchActions = () => {
  const { currentUser } = useCurrentUserContext();
  const { setSelectedUser } = useUsersStore((state) => state);
  const isCollapsed = useUsersStore(
    (state) => state.user.isCollapsed[currentUser.email] ?? true
  );
  const untrackedChallengesAvailable = useUsersStore((state) => {
    state.user.untrackedChallengesAvailable
      ? state.user.untrackedChallengesAvailable[currentUser.email]
      : false;
  });
  const checkUntrackedChallengesAvailability = useUsersStore(
    (state) => state.checkUntrackedChallengesAvailability
  );
  const setIsCollapsed = useUsersStore((state) => state.setIsCollapsed);
  const currentUserDispatch = useCurrentUserDispatchContext();

  useEffect(() => {
    (async () => {
      if (!isCollapsed && untrackedChallengesAvailable) {
        setSelectedUser({ ...currentUser });
        setIsCollapsed(currentUser.email, false);
        console.log("useDispatchActions/useEffect", currentUser);
        await postCurrentUser(currentUser);

        checkUntrackedChallengesAvailability(currentUser.email, false);
      }
    })();
  }, [
    setIsCollapsed,
    checkUntrackedChallengesAvailability,
    currentUser,
    setSelectedUser,
    isCollapsed,
    untrackedChallengesAvailable,
    currentUserDispatch,
  ]);

  const dispatchActions = () => {
    setSelectedUser({ ...currentUser });
    setIsCollapsed(currentUser.email, !isCollapsed);
  };

  return { dispatchActions };
};

export default useDispatchActions;
