import useCodewarsContext from "@/app/context/hooks/codewars/useCodewarsContext";
import useCodewarsDispatchContext from "@/app/context/hooks/codewars/useCodewarsDispatchContext";
import useDBCurrentUserContext from "@/app/context/hooks/db/useDBCurrentUserContext";
import useDBCurrentUserActionContext from "@/app/context/hooks/db/useDBCurrentUserDispatchContext";
import fetchCompletedChallenges from "./fetchCompletedChallenges";

const useHandleOpen = () => {
  const currentUserDispatch = useDBCurrentUserActionContext();
  const codewarsDispatch = useCodewarsDispatchContext();
  const { isCollapse, currentUser } = useDBCurrentUserContext();
  const { pageNumber } = useCodewarsContext();

  const handleOpen = async () => {
    currentUserDispatch({ type: "SET_COLLAPSE_OPEN", isCollapse: !isCollapse });
    codewarsDispatch({ type: "SET_LOADING", isLoading: true });
    fetchCompletedChallenges(currentUser, pageNumber, codewarsDispatch);
  };

  return { handleOpen };
};

export default useHandleOpen;
