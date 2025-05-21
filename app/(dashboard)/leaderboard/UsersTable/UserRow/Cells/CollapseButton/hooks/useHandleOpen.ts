import useCurrentUserContext from "@/app/context/hooks/db/useCurrentUserContext";
import { useUsersStore } from "@/app/store/users";

const useHandleOpen = () => {
  const { currentUser } = useCurrentUserContext();
  const { setSelectedUser } = useUsersStore((state) => state);
  const isCollapsed = useUsersStore(
    (state) => state.user.isCollapsed[currentUser.email] ?? true
  );
  const setIsCollapsed = useUsersStore((state) => state.setIsCollapsed);


  const handleOpen = async () => {
    setSelectedUser({ ...currentUser });
    setIsCollapsed(currentUser.email, !isCollapsed);
  };

  return { handleOpen };
};

export default useHandleOpen;
