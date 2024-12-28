"use client";

import { Box, Button } from "@mui/material";
import { useRouter } from "next/navigation";

interface Props {
  currentStep: number;
}

const StepperButtons = ({ currentStep = 0 }: Props) => {
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
      <Button onClick={() => {}}>Yes, it is me</Button>
    </>
  );
};

export default StepperButtons;
