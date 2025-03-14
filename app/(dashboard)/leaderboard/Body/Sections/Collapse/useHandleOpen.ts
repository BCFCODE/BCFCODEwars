import useCodewarsContext from "@/app/context/hooks/codewars/useCodewarsContext";
import useCodewarsDispatchContext from "@/app/context/hooks/codewars/useCodewarsDispatchContext";
import useDBAllUsersContext from "@/app/context/hooks/db/useDBAllUsersContext";
import useDBAllUsersDispatchContext from "@/app/context/hooks/db/useDBAllUsersDispatchContext";
import useDBCurrentUserContext from "@/app/context/hooks/db/useDBCurrentUserContext";
import useDBCurrentUserActionContext from "@/app/context/hooks/db/useDBCurrentUserDispatchContext";
import React from "react";
import fetchCompletedChallenges from "./fetchCompletedChallenges";

const useHandleOpen = () => {
  const dbAllUsersDispatch = useDBAllUsersDispatchContext();
  const currentUserDispatch = useDBCurrentUserActionContext();
  const codewarsDispatch = useCodewarsDispatchContext();
  const { isCollectSwitchVisible } = useDBAllUsersContext();
  const { isCollapse, currentUser } = useDBCurrentUserContext();
  const { pageNumber } = useCodewarsContext();

  // dbAllUsersDispatch({
  //   type: "SHOW_COLLECT_SWITCH",
  //   isCollectSwitchVisible: !isCollectSwitchVisible,
  // });

  // currentUserDispatch({ type: "SET_COLLAPSE_OPEN", isCollapse: !isCollapse });
  // codewarsDispatch({ type: "SET_LOADING", isLoading: true });
  // fetchCompletedChallenges(currentUser, pageNumber, codewarsDispatch);

  const handleOpen = async () => {
    dbAllUsersDispatch({
      type: "SHOW_COLLECT_SWITCH",
      isCollectSwitchVisible: !isCollectSwitchVisible,
    });
    currentUserDispatch({ type: "SET_COLLAPSE_OPEN", isCollapse: !isCollapse });
    codewarsDispatch({ type: "SET_LOADING", isLoading: true });
    fetchCompletedChallenges(currentUser, pageNumber, codewarsDispatch);
  };

  return { handleOpen };
};

export default useHandleOpen;
