import { CodeChallengesFilter, RewardStatus } from "@/types/diamonds";
import { CodewarsCompletedChallenge } from "@/types/codewars";
import useCurrentUserContext from "@/app/context/hooks/useCurrentUserContext";
import { useEffect, useMemo, useRef } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import DatabaseAPIService from "@/app/api/services/db";
import getQueryKey from "../CodewarsTable/Pagination/utils/getQueryKey";
import usePaginationStore, {
  defaultPagination,
} from "../CodewarsTable/Pagination/usePaginationStore";

const { postCurrentUser } = new DatabaseAPIService();

export interface UseFilter {
  activeFilter: string;
  both: CodewarsCompletedChallenge[];
  claimed: CodewarsCompletedChallenge[];
  unClaimed: CodewarsCompletedChallenge[];
}

const useFilter = (): UseFilter => {
  const queryClient = useQueryClient();
  const { currentUser } = useCurrentUserContext();
  const previousListRef = useRef<CodewarsCompletedChallenge[] | null>(null);
  const username = currentUser.codewars.username;
  const apiPageNumber = usePaginationStore(
    (state) => state.pagination[username] ?? defaultPagination
  ).apiPageNumber;
  const { queryKey } = getQueryKey({ username, apiPageNumber });

  const activeFilter: CodeChallengesFilter =
    currentUser.codewars.codeChallenges.challengeFilter;

  const list = currentUser.codewars.codeChallenges.list;

  const both = list;

  const claimed = useMemo(
    () =>
      list.filter(
        (challenge) => challenge.rewardStatus === RewardStatus.ClaimedDiamonds
      ),
    [list]
  );

  const unClaimed = useMemo(
    () =>
      list.filter(
        (challenge) => challenge.rewardStatus === RewardStatus.UnclaimedDiamonds
      ),
    [list]
  );

  const postMutation = useMutation({
    mutationFn: () => postCurrentUser(currentUser),
    onError: (error) => {
      console.error("Failed to post current user (useFilter):", error);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey });
    },
    retry: 2,
  });

  useEffect(() => {
    const prevList = previousListRef.current;

    const listChanged =
      !prevList ||
      prevList.length !== list.length ||
      prevList.some((prevItem, i) => prevItem.id !== list[i]?.id);

    if (listChanged) {
      postMutation.mutate();
      previousListRef.current = list;
    }
  }, [list, currentUser, postMutation]);

  return {
    activeFilter,
    both,
    claimed,
    unClaimed,
  };
};

export default useFilter;
