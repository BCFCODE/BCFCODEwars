import { CodewarsCompletedChallenge } from "@/types/codewars";
import { CodeChallengesFilter } from "@/types/diamonds";
import { TableBody } from "@mui/material";
import SingleRow from "./SingleRow";
import useFilter from "../../../../../hooks/useFilter";
import usePaginationStore, {
  defaultPagination,
} from "../Pagination/usePaginationStore";
import useCurrentUserContext from "@/app/context/hooks/useCurrentUserContext";
import { useEffect, useMemo } from "react";
import usePaginationQuery from "../Pagination/usePaginationQuery";
import mergeListsAvoidingDuplicates from "../Pagination/utils/mergeListsAvoidingDuplicates";
import { applyDefaultTrackingAndRewardStatusToAll } from "../../utils/applyRewardStatus";
import { sortByCompletedAtDesc } from "@/utils/dayjs";
import useCurrentUserDispatchContext from "@/app/context/hooks/useCurrentUserDispatchContext";

export default function Body() {
  const { currentUser } = useCurrentUserContext();
  const currentUserDispatch = useCurrentUserDispatchContext();
  const username = currentUser.codewars.username;
  const pagination = usePaginationStore(
    (state) => state.pagination[username] ?? defaultPagination
  );
  const activeFilter: CodeChallengesFilter =
    currentUser.codewars.codeChallenges.challengeFilter;

  const { data } = usePaginationQuery();

  const newList = data?.list ?? [];

  const sortedList = useMemo(() => {
    const mergedList = mergeListsAvoidingDuplicates({
      oldList: currentUser.codewars.codeChallenges.list,
      newList: applyDefaultTrackingAndRewardStatusToAll(newList),
    });

    return sortByCompletedAtDesc(mergedList);
  }, [newList]);

  useEffect(() => {
    if (!data) return;

    // Prevent dispatch loop: only dispatch if data list length changed
    const currentList = currentUser.codewars.codeChallenges.list;
    const isLengthChanged = currentList.length !== sortedList.length;

    if (isLengthChanged) {
      currentUserDispatch({
        type: "UPDATE_CODE_CHALLENGES_LIST",
        list: sortedList,
        totalItems: data.totalItems,
        totalPages: data.totalPages,
      });
    }
  }, [data, sortedList, currentUser.codewars.codeChallenges.list.length]);

  const { both, claimed, unClaimed } = useFilter({
    activeFilter,
    list: sortedList,
  });

  let visibleChallenges: CodewarsCompletedChallenge[];

  switch (activeFilter) {
    case CodeChallengesFilter.ClaimedDiamonds:
      visibleChallenges = claimed;
      break;
    case CodeChallengesFilter.UnclaimedDiamonds:
      visibleChallenges = unClaimed;
      break;
    default:
      visibleChallenges = both;
  }

  const paginatedChallenges = useMemo(
    () =>
      visibleChallenges.slice(
        pagination.skip,
        pagination.skip + pagination.limit
      ),
    [visibleChallenges, pagination.skip, pagination.limit]
  );

  return (
    <>
      <TableBody>
        {paginatedChallenges.map((challenge) => (
          <SingleRow key={challenge.id} {...{ challenge }} />
        ))}
      </TableBody>
    </>
  );
}
