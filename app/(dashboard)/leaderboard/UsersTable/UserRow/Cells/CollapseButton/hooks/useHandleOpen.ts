import useChallengeList from "./useDiffAndUpdateList";
import useDispatchActions from "./useDispatchActions";

const useHandleOpen = () => {
  const { dispatchActions } = useDispatchActions();
  const { fetchAndShowChallenges } = useChallengeList();

  const handleOpen = async () => {
    fetchAndShowChallenges();
    dispatchActions();
  };

  return { handleOpen };
};

export default useHandleOpen;
