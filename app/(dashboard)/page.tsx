import * as React from "react";
import Typography from "@mui/material/Typography";
import { auth } from "../../auth";
import AnkiCards from "./AnkiCards";
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

      {/* <AnkiCards deckName="👩🏻‍💻BCFCODE -Theory"/> */}
      {/* <AnkiCards deckName="+Jokes"/> */}
      {/* <AnkiCards deckName="Brain Builders::》Digit Memory::Step 0 Forward 》7 Digits"/> */}
      <AnkiDecks />
    </>
  );
}
