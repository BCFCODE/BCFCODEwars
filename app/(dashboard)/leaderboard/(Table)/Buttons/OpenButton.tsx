
import { DatabaseUser } from "@/types/database";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { IconButton } from "@mui/material";

interface Props {
  userInDB: DatabaseUser;
  open: boolean;
  onOpen: () => void;
}

const OpenButton = ({ userInDB, open, onOpen }: Props) => {
  return (
    <>
      {/* Expand/Collapse button */}
      {userInDB.codewars?.isConnected && (
        <IconButton
          aria-label="Toggle challenge details"
          size="small"
          onClick={onOpen}
        >
          {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
        </IconButton>
      )}
    </>
  );
};

export default OpenButton;
