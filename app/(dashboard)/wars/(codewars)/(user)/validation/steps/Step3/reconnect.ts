"use server";

import DatabaseService from "@/app/services/db";

const { reconnectCodewarsUser } = new DatabaseService();
// const { getUsers } = new dbAPIService();
const reconnect = async ({
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
};

export default reconnect;
