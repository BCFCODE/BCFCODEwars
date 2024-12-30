import { auth } from "@/auth";
import { CodewarsUser } from "@/types/codewars";
import { Typography } from "@mui/material";
import Step1 from "./Step1/1";
import Step2 from "./Step2/2";
import Step3 from "./Step3/3";
import { Session } from "next-auth";

interface Props {
  currentStep: number;
  validatedUsername: string;
}

export interface StepProps extends Props {
  session: Session | null;
  codewars: CodewarsUser;
}

const Steps = async ({ currentStep, validatedUsername }: Props) => {
  const session = await auth();
  
  const response = await fetch(
    `https://www.codewars.com/api/v1/users/${validatedUsername}`,
    { cache: "no-store" }
  );
  const codewars = await response.json();

  const stepProps: StepProps = {
    currentStep,
    validatedUsername,
    session,
    codewars,
  };

  switch (currentStep) {
    case 0:
      return <Step1 {...stepProps} />;
    case 1:
      return <Step2 {...stepProps} />;
    case 2:
      return <Step3 {...stepProps} />;
    default:
      return <Typography>Invalid step number (Stepper Content)</Typography>;
  }
};

export default Steps;
