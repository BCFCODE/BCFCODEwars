import useCodewarsDispatchContext from "@/app/context/hooks/codewars/useCodewarsDispatchContext";
import { useState } from "react";
import useListQuery from "./ReactQuery/useListQuery";
import useInitializeList from "./useInitializeList";
import useDiffAndUpdateList from "./useUpdateListDiff";

const useChallengeList = () => {
  const [tryAgain, setTryAgain] = useState({
    isError: false,
    isLoading: false,
  });
  const codewarsDispatch = useCodewarsDispatchContext();
  const { initializeCodeChallengesList, isListEmpty } = useInitializeList();
  const { diffAndUpdateList } = useDiffAndUpdateList();

  const { isSuccess, isError, isLoading } = useListQuery();

  const fetchAndShowChallenges = async () => {
    try {
      setTryAgain(() => ({ isError: false, isLoading: true }));

      if (isSuccess) {
        if (isListEmpty) initializeCodeChallengesList();

        diffAndUpdateList();

        setTryAgain(() => ({ isError: false, isLoading: false }));
        codewarsDispatch({ type: "SET_ERROR", isError });
      } else {
        // TODO: Handle cases where data is missing
        setTryAgain(() => ({ isError: true, isLoading: false }));
        codewarsDispatch({ type: "SET_ERROR", isError: true });
      }
    } catch (error) {
      // TODO: Handle errors gracefully
      // console.error("Error fetching challenges: ", error);
      setTryAgain(() => ({ isError: true, isLoading: false }));
      codewarsDispatch({ type: "SET_ERROR", isError: true });
      // setError(true);
    } finally {
      setTryAgain(() => ({ isError: false, isLoading: false }));
      codewarsDispatch({ type: "SET_LOADING", isLoading: false });
      // setIsLoading(false);

      // TODO: Add additional cleanup or updates if needed
    }
  };

  return { fetchAndShowChallenges, tryAgain };
};

export default useChallengeList;
