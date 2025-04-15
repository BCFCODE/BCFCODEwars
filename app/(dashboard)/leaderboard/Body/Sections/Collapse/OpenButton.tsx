import { useLeaderBoardStore } from "@/app/store/leaderboard";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { IconButton } from "@mui/material";
import { useCurrentUser } from "../../../context/CurrentUser";
import useHandleOpen from "./hooks/useHandleOpen";

const OpenButton = () => {
  // const currentUser = useUsersStore(s => s.currentUser) as AuthenticatedUser
  const isCollapsed = useLeaderBoardStore((s) => s.currentUser.isCollapsed);
  const { handleOpen } = useHandleOpen();
  const { codewars } = useCurrentUser();

  return (
    <>
      {/* Expand/Collapse button */}
      {codewars.isConnected && (
        <IconButton
          aria-label="Toggle challenge details"
          size="small"
          onClick={() => handleOpen()}
        >
          {isCollapsed ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
        </IconButton>
      )}
    </>
  );
};

export default OpenButton;
