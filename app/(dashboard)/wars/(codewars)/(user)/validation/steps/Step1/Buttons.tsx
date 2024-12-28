"use client";

import { Box, Button } from "@mui/material";
import { useRouter } from "next/navigation";

interface Props {
  currentStep: number;
}

const Buttons = ({ currentStep = 0 }: Props) => {
  const router = useRouter();

  return (
    <>
      <Button
        color="inherit"
        onClick={() => router.push(`/wars`)}
        sx={{ mr: 1 }}
      >
        Back
      </Button>
      <Box sx={{ flex: "1 1 auto" }} />
      <Button onClick={() => router.push(`${currentStep + 1}`)}>Next</Button>
    </>
  );
};

export default Buttons;
