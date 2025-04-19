"use server";

import DatabaseService from "@/app/services/db";
import { StepProps } from "../stepSwitch";
import { CodeChallengesFilter } from "@/types/diamonds";

const { updateSingleCodewarsUser } = new DatabaseService();

const initializeAndStoreNewUserToDatabase = async ({
  session,
  codewars,
}: StepProps) => {
  
  updateSingleCodewarsUser((session?.user?.email ?? ''), {
    ...codewars,
    isConnected: true,
    codeChallenges: {
      ...codewars.codeChallenges,
      challengeFilter: CodeChallengesFilter.ClaimedDiamonds,
      list: [],
    },
    // username: validatedUsername,
  });
};

export default initializeAndStoreNewUserToDatabase;
