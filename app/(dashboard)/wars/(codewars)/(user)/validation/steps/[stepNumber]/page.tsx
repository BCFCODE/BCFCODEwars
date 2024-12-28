import { Box } from "@mui/material";

import CodewarsValidationStepper from "../stepper";
import StepperButtons from "../Buttons";
import StepperChildren from "../StepperChildren";

interface Props {
  params: Promise<{ stepNumber: number }>;
  searchParams: { username: string };
}

const StepNumberPage = async ({
  params,
  searchParams: { username },
}: Props) => {
  const stepNumber = (await params).stepNumber;

  return (
    <>
      <CodewarsValidationStepper activeStep={Number(stepNumber)} />

      <StepperChildren
        validatedUsername={username}
        stepNumber={Number(stepNumber)}
      />

      <Box sx={{ display: "flex", width: "100%", flexDirection: "row", pt: 2 }}>
        <StepperButtons currentStep={Number(stepNumber)} />
      </Box>
    </>
  );
};

export default StepNumberPage;
