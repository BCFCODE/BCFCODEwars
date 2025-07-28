// import CodewarsAPIService from "@/app/api/services/codewars";
import useCurrentUserContext from "@/app/context/hooks/useCurrentUserContext";
import { CodewarsCompletedChallenge } from "@/types/codewars";
import { QueryKey, useQuery } from "@tanstack/react-query";
import usePaginationStore, { defaultPagination } from "./usePaginationStore";
import getQueryKey from "./utils/getQueryKey";
import axios from "axios";

// const { getCompletedChallenges } = new CodewarsAPIService();

export interface CompletedChallengesQueryData {
  totalPages: number; // Total number of pages in the response
  totalItems: number; // Total number of items across all pages
  list: CodewarsCompletedChallenge[];
}

const usePaginationQuery = () => {
  const { currentUser } = useCurrentUserContext();
  // const currentUserDispatch = useCurrentUserDispatchContext();
  const username = currentUser.codewars.username;
  const apiPageNumber = usePaginationStore(
    (state) => state.pagination[username] ?? defaultPagination
  ).apiPageNumber;

  const { queryKey } = getQueryKey({ username, apiPageNumber });

  return useQuery<
    CompletedChallengesQueryData,
    Error,
    CompletedChallengesQueryData,
    QueryKey
  >({
    queryKey,
    queryFn: () =>
      axios
        .get<CompletedChallengesQueryData>(
          `/api/codewars/challenges/all?username=${username}&pageNumber=${apiPageNumber}`
        )
        .then((res) => res.data),
    // async () => {
    //   const { list, totalItems, totalPages } = await getCompletedChallenges({
    //     username,
    //     apiPageNumber,
    //   });

    //   // const mergedList = mergeListsAvoidingDuplicates({
    //   //   oldList: currentUser.codewars.codeChallenges.list,
    //   //   newList: applyDefaultTrackingAndRewardStatusToAll(list),
    //   // });

    //   // const sortedList = sortByCompletedAtDesc(mergedList);

    //   // currentUserDispatch({
    //   //   type: "UPDATE_CODE_CHALLENGES_LIST",
    //   //   list: sortedList,
    //   //   totalItems: totalItems,
    //   //   totalPages: totalPages,
    //   // });

    //   // console.log("usePaginationQuery/sortedList", sortedList, currentUser);

    //   return { list, totalItems, totalPages };
    // }
    enabled: !!username,
    staleTime: 1 * 1000 * 60,
    // retry: 1,
  });
};

export default usePaginationQuery;
