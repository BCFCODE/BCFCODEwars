"use server";

import DatabaseService from "@/app/services/db";
import { CodewarsCompletedChallenge } from "@/types/codewars";
import { CurrentUser } from "@/types/users";

const { saveChallengesList } = new DatabaseService();

interface Props {
  currentUser: CurrentUser;
  list: CodewarsCompletedChallenge[];
}

export default async function saveChallengeListToDB({
  list,
  currentUser,
}: Props) {
  const userId = currentUser.codewars.id;
  saveChallengesList({ list, userId });
}
