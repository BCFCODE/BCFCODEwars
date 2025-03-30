import useChallengeList from "./useChallengeList";
import useDispatchActions from "./useDispatchActions";

const useHandleOpen = () => {
  const { dispatchActions } = useDispatchActions();
  const { buildChallengeList } = useChallengeList();

  const handleOpen = async () => {
    dispatchActions();
    buildChallengeList();
  };

  return { handleOpen };
};

export default useHandleOpen;
