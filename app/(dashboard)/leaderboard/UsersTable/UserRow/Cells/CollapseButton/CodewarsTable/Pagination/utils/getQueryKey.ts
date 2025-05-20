import codewarsQueryKeys from "@/app/context/providers/ReactQuery/queryKeys/codewars";

/**
 * Generates a unique React Query `queryKey` for paginated Codewars data per user.
 *
 * This key is used to cache and retrieve paginated challenge data in React Query.
 * It includes both the `username` and `apiPageNumber` to distinguish between
 * different users and pagination states.
 *
 * @param {Object} params - Parameters for generating the query key.
 * @param {string} params.username - The Codewars username. Used to namespace the query key.
 * @param {number} params.apiPageNumber - The current page number used to fetch challenges from the Codewars API.
 *
 * @returns {{ queryKey: string[] }} - A unique query key array formatted for use with React Query hooks.
 *
 * @example
 * const { queryKey } = getQueryKey({ username: "morteza", apiPageNumber: 2 });
 * useQuery({ queryKey, queryFn: ... });
 *
 * @remarks
 * This key structure ensures that pagination state is isolated per user,
 * which allows efficient caching and avoids accidental query overlap.
 */
interface Props {
  username: string;
  apiPageNumber: number;
}

const getQueryKey = ({ username, apiPageNumber }: Props) => {
  const queryKey = username
    ? [
        codewarsQueryKeys.pagination,
        `username: ${username}`,
        `apiPageNumber: ${apiPageNumber}`,
      ]
    : [codewarsQueryKeys.pagination];

  return { queryKey };
};

export default getQueryKey;
