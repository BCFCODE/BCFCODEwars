"use client";

import { CodewarsUser } from "@/types/codewars";
import { Box, Button } from "@mui/material";
import { useRouter } from "next/navigation";

interface Props {
  currentStep: number;
  codewars: CodewarsUser;
}

const Buttons = ({ codewars, currentStep = 0 }: Props) => {
  const router = useRouter();

  const handleAddCodewarsUsernameToMongoDB = () => {
    console.log('handleAddCodewarsUsernameToMongoDB',codewars);
  };

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
      <Button onClick={handleAddCodewarsUsernameToMongoDB}>
        Yes, it is me
      </Button>
    </>
  );
};

export default Buttons;
