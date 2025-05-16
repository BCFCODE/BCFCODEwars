// import useCodewarsContext from "@/app/context/hooks/codewars/useCodewarsContext";
import useCurrentUserContext from "@/app/context/hooks/db/useCurrentUserContext";
import useCurrentUserDispatchContext from "@/app/context/hooks/db/useCurrentUserDispatchContext";
import usePaginationQuery from "../CodewarsTable/Pagination/usePaginationQuery";
import extractListDiff from "../utils/extractListDiff";
import { useUsersStore } from "@/app/context/store/users";
import dbAPIService from "@/app/api/services/db";

const { postCurrentUser } = new dbAPIService();

const useDiffAndUpdateList = () => {
  const { currentUser } = useCurrentUserContext();
  const untrackedChallengesAvailable = useUsersStore((state) =>
    state.user.untrackedChallengesAvailable
      ? state.user.untrackedChallengesAvailable[currentUser.email]
      : false
  );
  const checkUntrackedChallengesAvailability = useUsersStore(
    (state) => state.checkUntrackedChallengesAvailability
  );
  const isCollapsed = useUsersStore(
    (state) => state.user.isCollapsed[currentUser.email] ?? true
  );
  const currentUserDispatch = useCurrentUserDispatchContext();

  const { data, isSuccess } = usePaginationQuery();

  const diffAndUpdateList = async () => {
    console.log("diffAndUpdateList called...");
    if (isCollapsed) {
      try {
        if (isSuccess) {
          const previousChallenges = currentUser.codewars.codeChallenges.list;
          const { list: fetchedChallenges } = data;

          const untrackedChallenges = extractListDiff({
            previousChallenges,
            fetchedChallenges,
          });

          console.log("untrackedChallenges >>>", untrackedChallenges);

          const isUntrackedChallengesListEmpty =
            untrackedChallenges.length === 0;

          if (!isUntrackedChallengesListEmpty) {
            checkUntrackedChallengesAvailability(currentUser.email, true);

            // (async () => {
            //   console.log("Posting...");
            //   const { success } = await postCurrentUser(currentUser);

            //   if (success) {
            //     console.log("user posted successfully...");
            //     checkUntrackedChallengesAvailability(currentUser.email, false);
            //   } else {
            //     checkUntrackedChallengesAvailability(currentUser.email, true);
            //   }
            // })();

            currentUserDispatch({
              type: "ADD_UNTRACKED_CHALLENGES_TO_LIST",
              untrackedChallenges,
              totalItems: data.totalItems,
              totalPages: data.totalPages,
            });
          } else {
            checkUntrackedChallengesAvailability(currentUser.email, false);
            // currentUserDispatch({
            //   type: "CHECK_UNTRACKED_CHALLENGES_AVAILABILITY",
            //   untrackedChallengesAvailable: false,
            // });
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
