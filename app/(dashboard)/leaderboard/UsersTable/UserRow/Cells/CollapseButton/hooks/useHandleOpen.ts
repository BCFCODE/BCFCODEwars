import useCurrentUserContext from "@/app/context/hooks/db/useCurrentUserContext";
import { useUsersStore } from "@/app/context/store/users";
import useChallengeList from "./useDiffAndUpdateList";

const useHandleOpen = () => {
  const { currentUser } = useCurrentUserContext();
  const setSelectedUser = useUsersStore((state) => state.setSelectedUser);
  const isCollapsed = useUsersStore(
    (state) => state.user.isCollapsed[currentUser.email] ?? true
  );
  const setIsCollapsed = useUsersStore((state) => state.setIsCollapsed);

  const { fetchAndShowChallenges } = useChallengeList();

  const handleOpen = async () => {
    fetchAndShowChallenges();
    setSelectedUser({ ...currentUser });
    setIsCollapsed(currentUser.email, !isCollapsed);
  };

  return { handleOpen };
};

export default useHandleOpen;
