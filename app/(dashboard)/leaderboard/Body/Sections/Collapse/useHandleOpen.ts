import useCodewarsContext from "@/app/context/hooks/codewars/useCodewarsContext";
import useCodewarsDispatchContext from "@/app/context/hooks/codewars/useCodewarsDispatchContext";
import useCurrentUserContext from "@/app/context/hooks/db/useCurrentUserContext";
import useCurrentUserDispatchContext from "@/app/context/hooks/db/useDBCurrentUserDispatchContext";
import fetchCompletedChallenges from "../fetchCompletedChallenges";

const useHandleOpen = () => {
  const currentUserDispatch = useCurrentUserDispatchContext();
  const codewarsDispatch = useCodewarsDispatchContext();
  const { isCollapse, currentUser } = useCurrentUserContext();
  const { pageNumber } = useCodewarsContext();

  const handleOpen = async () => {
    currentUserDispatch({ type: "SET_COLLAPSE_OPEN", isCollapse: !isCollapse });
    codewarsDispatch({ type: "SET_LOADING", isLoading: true });
    fetchCompletedChallenges({
      currentUser,
      currentUserDispatch,
      pageNumber,
      codewarsDispatch,
    });
  };

  return { handleOpen };
};

export default useHandleOpen;
