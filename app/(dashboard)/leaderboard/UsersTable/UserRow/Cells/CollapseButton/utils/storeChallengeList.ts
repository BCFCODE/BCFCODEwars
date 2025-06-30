"use server";

import DatabaseService from "@/app/services/db";
import { CodewarsCompletedChallenge } from "@/types/codewars";
import { AuthenticatedUser } from "@/types/users";
import { CompletedChallengesQueryData } from "../CodewarsTable/Pagination/usePaginationQuery";

const { saveChallengesList } = new DatabaseService();

interface Props {
  currentUser: AuthenticatedUser;
  list: CodewarsCompletedChallenge[];
  queryData: CompletedChallengesQueryData;
}

export default async function storeChallengeList({
  list,
  currentUser,
  queryData,
}: Props) {
  const userId = currentUser.codewars.id;

  await saveChallengesList({ list, userId, queryData });
}
