"use server";

import DatabaseService from "@/app/services/db";
import { StepProps } from "../stepSwitch";
import { Session } from "next-auth";

const { reconnectCodewarsUser } = new DatabaseService();
// const { getUsers } = new dbAPIService();
const initializeAndStoreNewUserToDatabase = async ({
  name,
  username,
  email,
  clan,
}: {
  name: string;
  username: string;
  email: string;
  clan: string;
}) => {
  reconnectCodewarsUser({ email, name, username, clan });

  return;
};

export default initializeAndStoreNewUserToDatabase;
