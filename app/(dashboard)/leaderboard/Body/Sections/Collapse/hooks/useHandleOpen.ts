import { useCurrentUser } from "@/app/(dashboard)/leaderboard/context/CurrentUser";
import useChallengeList from "./useDiffAndUpdateList";
import useDispatchActions from "./useDispatchActions";
import { useUsersStore } from "@/app/store/users";

const useHandleOpen = () => {
  const {
    actions: { setSelectedUser },
  } = useUsersStore((state) => state);
  const { dispatchActions } = useDispatchActions();
  const { fetchAndShowChallenges } = useChallengeList();
  const currentUser = useCurrentUser();

  const handleOpen = async () => {
    setSelectedUser(currentUser);
    fetchAndShowChallenges();
    dispatchActions();
  };

  return { handleOpen };
};

export default useHandleOpen;
