import dbAPIService from "@/app/api/services/db";
import useCurrentUserContext from "@/app/context/hooks/db/useCurrentUserContext";
import useCurrentUserDispatchContext from "@/app/context/hooks/db/useCurrentUserDispatchContext";
import { useUsersStore } from "@/app/context/store/users";
import { useEffect, useState } from "react";

const { postCurrentUser } = new dbAPIService();

const useDispatchActions = () => {
  // const [isUserPosted, setIsUserPosted] = useState(false);
  const { currentUser } = useCurrentUserContext();
  const { setSelectedUser } = useUsersStore((state) => state);
  const isCollapsed = useUsersStore(
    (state) => state.user.isCollapsed[currentUser.email] ?? true
  );
  const untrackedChallengesAvailable = useUsersStore((state) =>
    state.user.untrackedChallengesAvailable
      ? state.user.untrackedChallengesAvailable[currentUser.email]
      : false
  );
  const checkUntrackedChallengesAvailability = useUsersStore(
    (state) => state.checkUntrackedChallengesAvailability
  );
  const setIsCollapsed = useUsersStore((state) => state.setIsCollapsed);
  const currentUserDispatch = useCurrentUserDispatchContext();

  useEffect(() => {
    console.log(
      "useEffect called...",
      !isCollapsed,
      "untrackedChallengesAvailable",
      untrackedChallengesAvailable
      // 'isUserPosted', isUserPosted
    );
    (async () => {
      if (!isCollapsed && untrackedChallengesAvailable) {
        setSelectedUser({ ...currentUser });
        setIsCollapsed(currentUser.email, false);
        console.log(
          "postCurrentUser(currentUser) called...",
          currentUser.email
        );
        console.log('Posting...')
        const { success } = await postCurrentUser(currentUser);

        if (success) {
          console.log("user posted successfully...");
          checkUntrackedChallengesAvailability(currentUser.email, false);
        } else {
          checkUntrackedChallengesAvailability(currentUser.email, true);
        }
      }
    })();
  }, [
    // isUserPosted,
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
