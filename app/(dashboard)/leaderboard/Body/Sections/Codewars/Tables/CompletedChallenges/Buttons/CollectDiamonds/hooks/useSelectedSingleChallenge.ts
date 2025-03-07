"use server";

import DBService from "@/app/services/db-service";
import { CodewarsSingleChallenge } from "@/types/codewars";
import { CurrentUser } from "@/types/db/users";

const { saveNewCodewarsSingleChallenge } = new DBService();

export default async function useSelectedSingleChallenge(
  selectedSingleChallenge: CodewarsSingleChallenge,
  currentUser: CurrentUser
) {
  saveNewCodewarsSingleChallenge(
    selectedSingleChallenge,
    currentUser.codewars.id
  );
}
