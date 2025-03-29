import CodewarsAPIService from "@/app/api/services/codewars";
import useCodewarsContext from "@/app/context/hooks/codewars/useCodewarsContext";
import useCodewarsDispatchContext from "@/app/context/hooks/codewars/useCodewarsDispatchContext";
import useCurrentUserContext from "@/app/context/hooks/db/useCurrentUserContext";
import useCurrentUserDispatchContext from "@/app/context/hooks/db/useCurrentUserDispatchContext";
import initializeCodeChallengesList from "../utils/initializeCodeChallengesList";

const { getCompletedChallenges } = new CodewarsAPIService();

const useChallengeList = () => {
  const { currentUser } = useCurrentUserContext();
  const currentUserDispatch = useCurrentUserDispatchContext();
  const { pageNumber } = useCodewarsContext();
  const codewarsDispatch = useCodewarsDispatchContext();

  const buildChallengeList = async () => {
    try {
      const response = await getCompletedChallenges(
        currentUser.codewars.username,
        pageNumber
      );

      if ("data" in response) {
        const { data } = response.data;
        const isListEmpty = !currentUser.codewars.codeChallenges.list.length;
        // console.log("isListEmpty", isListEmpty);

        if (isListEmpty)
          initializeCodeChallengesList({
            data,
            currentUser,
            currentUserDispatch,
          });

        codewarsDispatch({ type: "SET_ERROR", isError: false });
        // codewarsDispatch({
        //   type: "SET_COMPLETED_CHALLENGES",
        //   completedChallenges,
        // });
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
