import useDatabaseUserContext from "@/app/context/hooks/useDatabaseUserContext";
import { DatabaseUser } from "@/types/database";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { IconButton } from "@mui/material";

interface Props {
  open: boolean;
  onOpen: () => void;
}

const OpenButton = ({ open, onOpen }: Props) => {
  const {
    currentUser: { codewars },
  } = useDatabaseUserContext();
  return (
    <>
      {/* Expand/Collapse button */}
      {codewars?.isConnected && (
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
