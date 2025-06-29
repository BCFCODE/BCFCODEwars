import { CodewarsCompletedChallenge } from "@/types/codewars";
import { CodeChallengesFilter } from "@/types/diamonds";
import { TableBody } from "@mui/material";
import SingleRow from "./SingleRow";
import useFilter from "../../hooks/useFilter";
import usePaginationStore, {
  defaultPagination,
} from "../Pagination/usePaginationStore";
import useCurrentUserContext from "@/app/context/hooks/useCurrentUserContext";
import { useMemo } from "react";

export default function Body() {
  const { currentUser } = useCurrentUserContext();
  const username = currentUser.codewars.username;
  const pagination = usePaginationStore(
    (state) => state.pagination[username] ?? defaultPagination
  );

  const { activeFilter, both, claimed, unClaimed } = useFilter();

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
