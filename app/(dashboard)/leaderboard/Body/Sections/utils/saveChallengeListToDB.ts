"use server";

import DBService from "@/app/services/db-service";
import { CodewarsCompletedChallenge } from "@/types/codewars";
import { CurrentUser } from "@/types/users";

const { saveChallengesList } = new DBService();

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
