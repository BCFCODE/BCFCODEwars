import useCodewarsContext from "@/app/context/hooks/codewars/useCodewarsContext";
import useCodewarsDispatchContext from "@/app/context/hooks/codewars/useCodewarsDispatchContext";
import useDBCurrentUserContext from "@/app/context/hooks/db/useDBCurrentUserContext";
import useDBCurrentUserActionContext from "@/app/context/hooks/db/useDBCurrentUserDispatchContext";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { IconButton } from "@mui/material";
import handleOpen from "./handleOpen";

const OpenButton = () => {
  const { isCollapse, currentUser } = useDBCurrentUserContext();
  const currentUserDispatch = useDBCurrentUserActionContext();
  const { pageNumber } = useCodewarsContext();
  const codewarsDispatch = useCodewarsDispatchContext();

  return (
    <>
      {/* Expand/Collapse button */}
      {currentUser.codewars?.isConnected && (
        <IconButton
          aria-label="Toggle challenge details"
          size="small"
          onClick={() =>
            handleOpen({
              pageNumber,
              codewarsDispatch,
              currentUserDispatch,
              isCollapse: isCollapse ?? false,
              currentUser,
            })
          }
        >
          {isCollapse ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
        </IconButton>
      )}
    </>
  );
};

export default OpenButton;
