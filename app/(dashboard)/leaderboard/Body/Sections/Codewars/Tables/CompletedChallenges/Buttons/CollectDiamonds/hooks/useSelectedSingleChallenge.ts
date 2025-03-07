"use server";

import DBService from "@/app/services/db-service";
import { CodewarsCompletedChallenge } from "@/types/codewars";
import { CurrentUser } from "@/types/db/users";

const { saveNewCodewarsSingleChallenge } = new DBService();

interface Props {
  selectedChallenge: CodewarsCompletedChallenge;
  currentUser: CurrentUser;
}

export default async function useSelectedSingleChallenge({
  currentUser,
  selectedChallenge,
}: Props) {
  saveNewCodewarsSingleChallenge(selectedChallenge, currentUser.codewars.id);
}
