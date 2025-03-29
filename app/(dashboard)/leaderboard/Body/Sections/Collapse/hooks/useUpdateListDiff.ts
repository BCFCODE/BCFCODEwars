import CodewarsAPIService from "@/app/api/services/codewars";
import useCodewarsContext from "@/app/context/hooks/codewars/useCodewarsContext";
import useCurrentUserContext from "@/app/context/hooks/db/useCurrentUserContext";
import extractListDiff from "../utils/extractListDiff";

const { getCompletedChallenges } = new CodewarsAPIService();

const useUpdateListDiff = () => {
  const { currentUser, isCollapsed } = useCurrentUserContext();
  const { pageNumber } = useCodewarsContext();

  const diffAndUpdateList = async () => {
    if (!isCollapsed) {
      try {
        const response = await getCompletedChallenges(
          currentUser.codewars.username,
          pageNumber
        );
        if ("data" in response) {
          const previousChallenges = currentUser.codewars.codeChallenges.list;
          const { data: fetchedChallenges } = response.data;

          const untrackedChallenges = extractListDiff({
            previousChallenges,
            fetchedChallenges,
          });
          console.log("untrackedChallenges", untrackedChallenges);
        }
      } catch (error) {}
    }
  };

  return { diffAndUpdateList };
};

export default useUpdateListDiff;
