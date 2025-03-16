import useCurrentUserDispatchContext from "@/app/context/hooks/db/useDBCurrentUserDispatchContext";
import React from "react";

const useCodeChallengesList = () => {
  const currentUserDispatch = useCurrentUserDispatchContext();
  return { currentUserDispatch };
};

export default useCodeChallengesList;
