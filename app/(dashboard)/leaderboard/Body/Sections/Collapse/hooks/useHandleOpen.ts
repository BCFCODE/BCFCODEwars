import useChallengeList from "./useDiffAndUpdateList";
import useDispatchActions from "./useDispatchActions";

const useHandleOpen = () => {
  const { dispatchActions } = useDispatchActions();
  const { fetchAndShowChallenges } = useChallengeList();

  const handleOpen = async () => {
    dispatchActions();
    fetchAndShowChallenges();
  };

  return { handleOpen };
};

export default useHandleOpen;
