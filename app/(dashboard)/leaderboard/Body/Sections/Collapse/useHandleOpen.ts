import useCodewarsContext from "@/app/context/hooks/codewars/useCodewarsContext";
import useCodewarsDispatchContext from "@/app/context/hooks/codewars/useCodewarsDispatchContext";
import useCurrentUserContext from "@/app/context/hooks/db/useCurrentUserContext";
import useCurrentUserDispatchContext from "@/app/context/hooks/db/useCurrentUserDispatchContext";
import fetchCompletedChallenges from "../fetchCompletedChallenges";
import useAllUsersDispatchContext from "@/app/context/hooks/db/useAllUsersDispatchContext";

const useHandleOpen = () => {
  const currentUserDispatch = useCurrentUserDispatchContext();
  const codewarsDispatch = useCodewarsDispatchContext();
  const { isCollapse, currentUser } = useCurrentUserContext();
  const { pageNumber } = useCodewarsContext();
  const allUsersDispatch = useAllUsersDispatchContext();

  const handleOpen = async () => {
    allUsersDispatch({ type: "UPDATE_CURRENT_USER", currentUser });
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
