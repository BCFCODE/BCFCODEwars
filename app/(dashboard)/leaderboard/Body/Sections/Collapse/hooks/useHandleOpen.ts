import useCodewarsContext from "@/app/context/hooks/codewars/useCodewarsContext";
import useCodewarsDispatchContext from "@/app/context/hooks/codewars/useCodewarsDispatchContext";
import useCurrentUserContext from "@/app/context/hooks/db/useCurrentUserContext";
import useCurrentUserDispatchContext from "@/app/context/hooks/db/useCurrentUserDispatchContext";
import fetchCompletedChallenges from "../../utils/fetchCompletedChallenges";
import useDispatchActions from "./useDispatchActions";

const useHandleOpen = () => {
  const currentUserDispatch = useCurrentUserDispatchContext();
  const codewarsDispatch = useCodewarsDispatchContext();
  const { currentUser } = useCurrentUserContext();
  const { pageNumber } = useCodewarsContext();
  const { dispatchActions } = useDispatchActions();

  const handleOpen = async () => {
    dispatchActions();

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
