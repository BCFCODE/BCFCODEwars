import useCurrentUserContext from "@/app/context/hooks/db/useCurrentUserContext";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { IconButton } from "@mui/material";
import useHandleOpen from "./hooks/useHandleOpen";
import { useUsersStore } from "@/app/context/store/users";

const OpenButton = () => {
  const { currentUser } = useCurrentUserContext();
  const setSelectedUser = useUsersStore((state) => state.setSelectedUser);
  const isCollapsed = useUsersStore(
    (state) => state.user.isCollapsed[currentUser.email] ?? true
  );
  const { handleOpen } = useHandleOpen();

  return (
    <>
      {/* Expand/Collapse button */}
      {currentUser.codewars?.isConnected && (
        <IconButton
          aria-label="Toggle challenge details"
          size="small"
          onClick={() => handleOpen()}
        >
          {!isCollapsed 
          // &&  currentUser.email === selectedUser?.email 
          ? 
          (
            <KeyboardArrowUpIcon />
          ) : (
            <KeyboardArrowDownIcon />
          )}
        </IconButton>
      )}
    </>
  );
};

export default OpenButton;
