"use client";

import { Box } from "@mui/material";
import StepperButtons from "../../(stepper)/Buttons";
import StepperContent from "../../(stepper)/(content)/Content";
import CodewarsValidationStepper from "../../(stepper)/Stepper";

interface Props {
  params: { stepNumber: number };
}

const StepNumberPage = ({ params: { stepNumber } }: Props) => {
  return (
    <>
      <CodewarsValidationStepper activeStep={Number(stepNumber)} />

      <StepperContent stepNumber={Number(stepNumber)} />

      <Box sx={{ display: "flex", width: "100%", flexDirection: "row", pt: 2 }}>
        <StepperButtons currentStep={Number(stepNumber)} />
      </Box>
    </>
  );
};

export default StepNumberPage;
