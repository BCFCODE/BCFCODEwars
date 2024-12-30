"use client";

import { CodewarsDatabase, CodewarsUser } from "@/types/codewars";
import { Box, Button } from "@mui/material";
import { useRouter } from "next/navigation";
import handleAddUserToDB from "./AddUser";

interface Props {
  currentStep: number;
  codewars: CodewarsDatabase;
}

const Buttons = ({ codewars, currentStep = 0 }: Props) => {
  const router = useRouter();

  return (
    <>
      <Button
        color="inherit"
        disabled={currentStep === 3}
        onClick={() => router.push(`${currentStep - 1}`)}
        sx={{ mr: 1 }}
      >
        No
      </Button>
      <Box sx={{ flex: "1 1 auto" }} />
      <Button onClick={() => handleAddUserToDB(codewars)}>Yes, it is me</Button>
    </>
  );
};

export default Buttons;
