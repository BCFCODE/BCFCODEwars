import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { IconButton } from "@mui/material";
import useHandleOpen from "../../../hooks/useHandleOpen";
import { useUsersStore } from "@/app/store/users";
import useCurrentUserContext from "@/app/context/hooks/useCurrentUserContext";

const OpenButton = () => {
  const { currentUser } = useCurrentUserContext();
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
          {!isCollapsed ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
        </IconButton>
      )}
    </>
  );
};

export default OpenButton;
