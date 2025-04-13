import CodewarsAPIService from "@/app/api/services/codewars";
import useCodewarsContext from "@/app/context/hooks/codewars/useCodewarsContext";
import useCurrentUserContext from "@/app/context/hooks/db/useCurrentUserContext";
import useCurrentUserDispatchContext from "@/app/context/hooks/db/useCurrentUserDispatchContext";
import extractListDiff from "../utils/extractListDiff";

const { getCompletedChallenges } = new CodewarsAPIService();

const useDiffAndUpdateList = () => {
  const { currentUser, isCollapsed } = useCurrentUserContext();
  const { pageNumber } = useCodewarsContext();
  const currentUserDispatch = useCurrentUserDispatchContext();
  // const untrackedChallengesRef = useRef<CodewarsCompletedChallenge[]>(null);

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

          const isEmpty = fetchedChallenges.length === 0;

          if (!isEmpty) {
            currentUserDispatch({
              type: "ADD_UNTRACKED_CHALLENGES_TO_LIST",
              untrackedChallenges,
            });
            
          }
        } else {
          currentUserDispatch({
            type: "ADD_UNTRACKED_CHALLENGES_TO_LIST",
            untrackedChallenges: [],
          });
        }
      } catch (error) {
        // TODO
        currentUserDispatch({
          type: "ADD_UNTRACKED_CHALLENGES_TO_LIST",
          untrackedChallenges: [],
        });
      } finally {
        // console.log("currentUser", currentUser);
      }
    }
  };

  return { diffAndUpdateList };
};

export default useDiffAndUpdateList;
