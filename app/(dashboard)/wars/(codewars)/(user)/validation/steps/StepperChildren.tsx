import React from "react";
import Step1 from "./Step1/1";
import Step2 from "./Step2/2";
import Step3 from "./Step3/3";
import { Typography } from "@mui/material";

interface Props {
  stepNumber: number;
  validatedUsername: string;
}

const StepperChildren = ({ stepNumber, validatedUsername }: Props) => {
  switch (stepNumber) {
    case 0:
      return <Step1 />;
    case 1:
      return <Step2 />;
    case 2:
      return <Step3 validatedUsername={validatedUsername} />;
    default:
      return <Typography>Invalid step number (Stepper Content)</Typography>;
  }
};

export default StepperChildren;
