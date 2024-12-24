'use client'

import { Box, Button } from "@mui/material";
import { steps } from "./constants";
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
        // disabled={currentStep === 0}
        onClick={() => currentStep === 0 ? router.push(`/wars`) : router.push(`${currentStep - 1}`)}
        sx={{ mr: 1 }}
      >
        {currentStep === steps.length - 1 ? "No" : 'Back'}
      </Button>
      <Box sx={{ flex: "1 1 auto" }} />
      <Button
        onClick={() =>
          currentStep < steps.length && router.push(`${currentStep + 1}`)
        }
      >
        {currentStep === steps.length - 1 ? "Yes, it is me" : "Next"}
      </Button>
    </>
  );
};

export default StepperButtons;
