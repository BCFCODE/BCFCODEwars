import * as React from "react";
import Typography from "@mui/material/Typography";
import { auth } from "../../auth";
import AnkiDecks from "./AnkiDecks";

// import Image from "next/image";

export default async function HomePage() {
  const session = await auth();

  return (
    <>
      <Typography>
        Welcome to BCFCODEwars, {session?.user?.name || "User"}!
        {/* <Image height={500} width={500} src={session?.user?.image ?? ""} alt="" /> */}
      </Typography>
      {/* <AnkiDecks /> */}
    </>
  );
}
