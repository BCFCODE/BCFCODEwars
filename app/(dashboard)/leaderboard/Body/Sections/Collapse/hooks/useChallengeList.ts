import CodewarsAPIService from "@/app/api/services/codewars";
import useCodewarsContext from "@/app/context/hooks/codewars/useCodewarsContext";
import useCodewarsDispatchContext from "@/app/context/hooks/codewars/useCodewarsDispatchContext";
import useCurrentUserContext from "@/app/context/hooks/db/useCurrentUserContext";
import useInitializeList from "./useInitializeList";
import useUpdateListDiff from "./useUpdateListDiff";

const { getCompletedChallenges } = new CodewarsAPIService();

const useChallengeList = () => {
  const codewarsDispatch = useCodewarsDispatchContext();
  const { currentUser } = useCurrentUserContext();
  const { pageNumber } = useCodewarsContext();
  const { initializeCodeChallengesList, isListEmpty } = useInitializeList();
  const { diffAndUpdateList } = useUpdateListDiff();

  const buildChallengeList = async () => {
    try {
      const response = await getCompletedChallenges(
        currentUser.codewars.username,
        pageNumber
      );

      if ("data" in response) {
        if (isListEmpty) initializeCodeChallengesList(response.data);

        codewarsDispatch({ type: "SET_ERROR", isError: false });
      } else {
        // TODO: Handle cases where data is missing
        codewarsDispatch({ type: "SET_ERROR", isError: true });
      }
    } catch (error) {
      // TODO: Handle errors gracefully
      // console.error("Error fetching challenges: ", error);
      codewarsDispatch({ type: "SET_ERROR", isError: true });
      // setError(true);
    } finally {
      // diffAndUpdateList();
      codewarsDispatch({ type: "SET_LOADING", isLoading: false });
      // setIsLoading(false);

      // TODO: Add additional cleanup or updates if needed
    }
  };

  return { buildChallengeList };
};

export default useChallengeList;
