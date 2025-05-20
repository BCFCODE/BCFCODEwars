import useCodewarsContext from "@/app/context/hooks/codewars/useCodewarsContext";
import useCurrentUserContext from "@/app/context/hooks/db/useCurrentUserContext";
import useCurrentUserDispatchContext from "@/app/context/hooks/db/useCurrentUserDispatchContext";
import usePaginationQuery from "../CodewarsTable/Pagination/usePaginationQuery";
import extractListDiff from "../utils/extractListDiff";
import { useUsersStore } from "@/app/context/store/users";

const useDiffAndUpdateList = () => {
  const { currentUser } = useCurrentUserContext();
  const isCollapsed = useUsersStore(
    (state) => state.user.isCollapsed[currentUser.email] ?? true
  );
  const checkUntrackedChallengesAvailability = useUsersStore(
    (state) => state.checkUntrackedChallengesAvailability
  );
  const currentUserDispatch = useCurrentUserDispatchContext();

  const { data, isSuccess } = usePaginationQuery();

  const diffAndUpdateList = async () => {
    if (isSuccess) {
      const previousChallenges = currentUser.codewars.codeChallenges.list;
      const { list: fetchedChallenges } = data;

      const untrackedChallenges = extractListDiff({
        previousChallenges,
        fetchedChallenges,
      });

      const isUntrackedChallengesListEmpty = untrackedChallenges.length === 0;

      if (!isUntrackedChallengesListEmpty) {
        checkUntrackedChallengesAvailability(currentUser.email, true);
        currentUserDispatch({
          type: "ADD_UNTRACKED_CHALLENGES_TO_LIST",
          untrackedChallenges,
          totalItems: data.totalItems,
          totalPages: data.totalPages,
        });
      } else {
        checkUntrackedChallengesAvailability(currentUser.email, false);
      }
    }
  };

  return { diffAndUpdateList };
};

export default useDiffAndUpdateList;
