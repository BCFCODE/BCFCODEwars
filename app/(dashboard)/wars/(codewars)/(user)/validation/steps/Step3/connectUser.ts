"use server";

import DatabaseService from "@/app/services/db";
import { StepProps } from "../stepSwitch";
import { CodeChallengesFilter } from "@/types/diamonds";
import dbAPIService from "@/app/api/services/db";

const { reconnectCodewarsUser } = new DatabaseService();
// const { getUsers } = new dbAPIService();
const initializeAndStoreNewUserToDatabase = async ({
  validatedUsername,
  session,
  codewars,
}: StepProps) => {
  const email = session?.user?.email ?? "";

  reconnectCodewarsUser({ email, validatedUsername, codewars });

  // const fetchedUsers = await getUsers({ cache: "no-store" });
  // console.log('fetchedUsers', fetchedUsers)
  // updateSingleCodewarsUser(email, {
  //   ...codewars,
  //   isConnected: true,
  //   clan: codewars.clan,
  //   codeChallenges: {
  //     ...codewars.codeChallenges,
  //     challengeFilter: CodeChallengesFilter.ClaimedDiamonds,
  //     list: [],
  //   },
  //   username: validatedUsername,
  // });

  // initializeDiamonds(email);
  return;
};

export default initializeAndStoreNewUserToDatabase;
