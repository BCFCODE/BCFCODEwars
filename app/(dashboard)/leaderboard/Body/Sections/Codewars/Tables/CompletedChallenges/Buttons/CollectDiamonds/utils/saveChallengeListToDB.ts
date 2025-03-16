"use server";

import DBService from "@/app/services/db-service";
import { CodewarsCompletedChallenge } from "@/types/codewars";
import { CurrentUser } from "@/types/db/users";

interface Props {
  currentUser: CurrentUser;
  list: CodewarsCompletedChallenge[];
}

export default async function useCodewarsDB({ currentUser, list }: Props) {
  const { saveChallengesList } = new DBService();
  saveChallengesList(list, currentUser.codewars.id);
}
