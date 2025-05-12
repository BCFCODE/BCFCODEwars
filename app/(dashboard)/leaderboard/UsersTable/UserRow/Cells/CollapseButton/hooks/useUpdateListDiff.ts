import useCodewarsContext from "@/app/context/hooks/codewars/useCodewarsContext";
import useCurrentUserContext from "@/app/context/hooks/db/useCurrentUserContext";
import useCurrentUserDispatchContext from "@/app/context/hooks/db/useCurrentUserDispatchContext";
import usePaginationQuery from "../CodewarsTable/Pagination/usePaginationQuery";
import extractListDiff from "../utils/extractListDiff";
import { useUsersStore } from "@/app/context/store/users";

const useDiffAndUpdateList = () => {
    const isCollapsed = useUsersStore(
      (state) => state.user.selectedUser?.isCollapsed
    );
  const { currentUser } = useCurrentUserContext();
  const currentUserDispatch = useCurrentUserDispatchContext();

  const { data, isSuccess } = usePaginationQuery();

  const diffAndUpdateList = async () => {
    if (isCollapsed === false) {
      try {
        if (isSuccess) {
          const previousChallenges = currentUser.codewars.codeChallenges.list;
          const { list: fetchedChallenges } = data;

          const untrackedChallenges = extractListDiff({
            previousChallenges,
            fetchedChallenges,
          });

          const isUntrackedChallengesListEmpty =
            untrackedChallenges.length === 0;

          if (!isUntrackedChallengesListEmpty) {
            currentUserDispatch({
              type: "CHECK_UNTRACKED_CHALLENGES_AVAILABILITY",
              untrackedChallengesAvailable: true,
            });
            currentUserDispatch({
              type: "ADD_UNTRACKED_CHALLENGES_TO_LIST",
              untrackedChallenges,
              totalItems: data.totalItems,
              totalPages: data.totalPages,
            });
          } else {
            currentUserDispatch({
              type: "CHECK_UNTRACKED_CHALLENGES_AVAILABILITY",
              untrackedChallengesAvailable: false,
            });
          }
        } else {
          // currentUserDispatch({
          //   type: "ADD_UNTRACKED_CHALLENGES_TO_LIST",
          //   untrackedChallenges: [],
          // });
        }
      } catch (error) {
        // TODO
        // currentUserDispatch({
        //   type: "ADD_UNTRACKED_CHALLENGES_TO_LIST",
        //   untrackedChallenges: [],
        // });
      } finally {
        // console.log("currentUser", currentUser);
      }
    }
  };

  return { diffAndUpdateList };
};

export default useDiffAndUpdateList;
