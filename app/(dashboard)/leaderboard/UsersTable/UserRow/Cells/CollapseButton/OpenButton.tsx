import useCurrentUserContext from "@/app/context/hooks/db/useCurrentUserContext";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { IconButton } from "@mui/material";
import useHandleOpen from "./hooks/useHandleOpen";
import useCurrentUserQuery from "@/app/context/hooks/ReactQuery/useCurrentUserQuery";

const OpenButton = () => {
  // useCurrentUserQuery()
  const { isCollapsed, currentUser } = useCurrentUserContext();
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
          {isCollapsed ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
        </IconButton>
      )}
    </>
  );
};

export default OpenButton;
