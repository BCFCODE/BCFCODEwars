import CodewarsAPIService from "@/app/api/services/codewars";
import useCodewarsContext from "@/app/context/hooks/codewars/useCodewarsContext";
import { useLeaderBoardStore } from "@/app/store/leaderboard";
import { useUsersStore } from "@/app/store/users";
import extractListDiff from "../utils/extractListDiff";
import { useCurrentUser } from "@/app/(dashboard)/leaderboard/context/CurrentUser";

const { getCompletedChallenges } = new CodewarsAPIService();

const useDiffAndUpdateList = () => {
  const currentUser = useCurrentUser();
  const {
    actions: {
      checkUntrackedChallengesAvailability,
      addUntrackedChallengesToList,
    },
  } = useUsersStore((state) => state);
  const { pageNumber } = useCodewarsContext();

  const diffAndUpdateList = async () => {
    if (currentUser && !currentUser.isCollapsed) {
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

        const isUntrackedChallengesListEmpty = untrackedChallenges.length === 0;

        if (!isUntrackedChallengesListEmpty) {
          checkUntrackedChallengesAvailability(true);
          addUntrackedChallengesToList(untrackedChallenges);
        } else {
          checkUntrackedChallengesAvailability(false);
        }
      }
    }
  };

  return { diffAndUpdateList };
};

export default useDiffAndUpdateList;
