import { CodewarsCompletedChallenge } from "@/types/codewars";

/**
 * Merges two lists of completed Codewars challenges while avoiding duplicates by `id`.
 *
 * Ensures that any challenges from the `newList` that already exist in the `oldList`
 * (based on their unique `id`) are not re-added. This is useful when incrementally
 * loading paginated or newly fetched challenges and preserving existing cached data.
 *
 * @param {Object} params - The function parameters.
 * @param {CodewarsCompletedChallenge[]} params.oldList - The existing list of challenges already stored.
 * @param {CodewarsCompletedChallenge[]} params.newList - The new list of challenges to merge.
 *
 * @returns {CodewarsCompletedChallenge[]} A combined list of challenges with no duplicates.
 *
 * @example
 * const merged = mergeListsAvoidingDuplicates({ oldList: existing, newList: fetched });
 *
 * @remarks
 * This function assumes that each challenge has a unique `id` field, which is used
 * to detect and prevent duplication during the merge process.
 */

export interface MergeListProps {
  oldList: CodewarsCompletedChallenge[];
  newList: CodewarsCompletedChallenge[];
}

const mergeListsAvoidingDuplicates = ({
  oldList,
  newList,
}: MergeListProps): CodewarsCompletedChallenge[] => {
  const seen = new Set(oldList.map((challenge) => challenge.id));
  return [
    ...oldList,
    ...newList.filter((challenge) => !seen.has(challenge.id)),
  ];
};

export default mergeListsAvoidingDuplicates;
