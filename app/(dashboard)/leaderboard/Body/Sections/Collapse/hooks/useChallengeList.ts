import CodewarsAPIService from "@/app/api/services/codewars";
import useCodewarsContext from "@/app/context/hooks/codewars/useCodewarsContext";
import useCodewarsDispatchContext from "@/app/context/hooks/codewars/useCodewarsDispatchContext";
import useCurrentUserContext from "@/app/context/hooks/db/useCurrentUserContext";
import useCurrentUserDispatchContext from "@/app/context/hooks/db/useCurrentUserDispatchContext";
import initializeCodeChallengesList from "../utils/initializeCodeChallengesList";
import useListInitializer from "./useListInitializer";

const { getCompletedChallenges } = new CodewarsAPIService();

const useChallengeList = () => {
  const { currentUser } = useCurrentUserContext();
  const { pageNumber } = useCodewarsContext();
  const codewarsDispatch = useCodewarsDispatchContext();
  const { initializeCodeChallengesList, isListEmpty } = useListInitializer();

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
      }
    } catch (error) {
      // TODO: Handle errors gracefully
      // console.error("Error fetching challenges: ", error);
      codewarsDispatch({ type: "SET_ERROR", isError: true });
      // setError(true);
    } finally {
      codewarsDispatch({ type: "SET_LOADING", isLoading: false });
      // setIsLoading(false);

      // TODO: Add additional cleanup or updates if needed
    }
  };

  return { buildChallengeList };
};

export default useChallengeList;
