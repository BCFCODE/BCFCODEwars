"use server";

import DBService from "@/app/services/db-service";
import { StepProps } from "../stepSwitch";

const { updateSingleCodewarsUser } = new DBService();

const handleAddUserToDB = async ({ session, codewars }: StepProps) => {
  updateSingleCodewarsUser(session?.user.email, {
    ...codewars,
    isConnected: true,
  });
};

export default handleAddUserToDB;
