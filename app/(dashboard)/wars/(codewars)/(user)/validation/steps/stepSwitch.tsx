import { auth } from "@/auth";
import { CodewarsUser } from "@/types/codewars";
import { Typography } from "@mui/material";
import Step1 from "./Step1/1";
import Step2 from "./Step2/2";
import Step3 from "./Step3/3";
import { Session } from "next-auth";
import Step4 from "./Step4 (success)/4";

interface Props {
  currentStep: number;
  validatedUsername: string;
  isDbUsernameSyncedWithCodewars?: boolean
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
      return <Step4 {...stepProps} />;
  }
};

export default Steps;
