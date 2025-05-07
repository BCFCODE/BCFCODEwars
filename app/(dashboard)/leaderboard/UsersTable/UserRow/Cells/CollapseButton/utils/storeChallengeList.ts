"use server";

import { GetCompletedChallengesResponse } from "@/app/api/codewars/challenges/all/route";
import DatabaseService from "@/app/services/db";
import { CodewarsCompletedChallenge } from "@/types/codewars";
import { AuthenticatedUser } from "@/types/users";

const { saveChallengesList } = new DatabaseService();

interface Props {
  currentUser: AuthenticatedUser;
  list: CodewarsCompletedChallenge[];
  data: GetCompletedChallengesResponse;
}

export default async function storeChallengeList({
  list,
  currentUser,
  data,
}: Props) {
  const userId = currentUser.codewars.id;
  
  await saveChallengesList({ list, userId, data });
}
