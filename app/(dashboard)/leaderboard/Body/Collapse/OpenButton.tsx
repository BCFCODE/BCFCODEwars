import useDBUserContext from "@/app/context/hooks/useDBUserContext";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { IconButton } from "@mui/material";

interface Props {
  isCollapse: boolean;
  handleOpen: () => void;
}

const OpenButton = ({ isCollapse, handleOpen }: Props) => {
  const {
    currentUser: { codewars },
  } = useDBUserContext();
  return (
    <>
      {/* Expand/Collapse button */}
      {codewars?.isConnected && (
        <IconButton
          aria-label="Toggle challenge details"
          size="small"
          onClick={handleOpen}
        >
          {isCollapse ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
        </IconButton>
      )}
    </>
  );
};

export default OpenButton;
