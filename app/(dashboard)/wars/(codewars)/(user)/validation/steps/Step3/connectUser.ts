"use server";

import DatabaseService from "@/app/services/db-service";
import { StepProps } from "../stepSwitch";
import { CodeChallengesFilter } from "@/types/diamonds";

const { updateSingleCodewarsUser } = new DatabaseService();

const handleAddUserToDB = async ({ session, codewars }: StepProps) => {
  updateSingleCodewarsUser(session?.user.email, {
    ...codewars,
    isConnected: true,
    codeChallenges: {
      ...codewars.codeChallenges,
      challengeFilter: CodeChallengesFilter.ClaimedDiamonds,
      list: [],
    },
  });
};

export default handleAddUserToDB;
