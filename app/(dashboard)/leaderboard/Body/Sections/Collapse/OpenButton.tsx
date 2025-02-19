import useCodewarsContext from "@/app/context/hooks/useContexts/useCodewarsContext";
import useCodewarsDispatchContext from "@/app/context/hooks/useDispatches/useCodewarsDispatchContext";
import useDBCurrentUserContext from "@/app/context/hooks/useContexts/useDBCurrentUserContext";
import useDBCurrentUserDispatchContext from "@/app/context/hooks/useDispatches/useDBCurrentUserDispatchContext";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { IconButton } from "@mui/material";
import handleTry from "./Error/handleTry";

const OpenButton = () => {
  const { isCollapse, currentUser } = useDBCurrentUserContext();
  const currentUserDispatch = useDBCurrentUserDispatchContext();
  const { pageNumber } = useCodewarsContext();
  const codewarsDispatch = useCodewarsDispatchContext();

  const handleOpen = async () => {
    currentUserDispatch({ type: "SET_COLLAPSE_OPEN", isCollapse: !isCollapse });
    codewarsDispatch({ type: "SET_LOADING", isLoading: true });
    handleTry(currentUser, pageNumber, codewarsDispatch);
  };

  return (
    <>
      {/* Expand/Collapse button */}
      {currentUser.codewars?.isConnected && (
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
