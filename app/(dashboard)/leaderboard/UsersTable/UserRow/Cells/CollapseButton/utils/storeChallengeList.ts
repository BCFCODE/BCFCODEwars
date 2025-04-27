"use server";

import DatabaseService from "@/app/services/db";
import { CodewarsCompletedChallenge } from "@/types/codewars";
import { AuthenticatedUser } from "@/types/users";

const { saveChallengesList } = new DatabaseService();

interface Props {
  currentUser: AuthenticatedUser;
  list: CodewarsCompletedChallenge[];
}

export default async function storeChallengeList({ list, currentUser }: Props) {
  const userId = currentUser.codewars.id;
  await saveChallengesList({ list, userId });
}
