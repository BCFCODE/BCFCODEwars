"use server";

import DBService from "@/app/services/db-service";
import { CodewarsCompletedChallenge } from "@/types/codewars";
import { CurrentUser } from "@/types/db/users";

interface Props {
  currentUser: CurrentUser;
  list: CodewarsCompletedChallenge[];
}

export default async function updateListAndSum({ currentUser, list }: Props) {
  const { saveChallengesList } = new DBService();
  console.log('updateListAndSum > currentUser.diamonds.sum.codewars', currentUser.diamonds.sum.codewars)
  saveChallengesList(list, currentUser.codewars.id);
}
