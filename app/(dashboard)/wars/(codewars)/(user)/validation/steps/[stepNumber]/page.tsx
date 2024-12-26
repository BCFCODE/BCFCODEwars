import { Box } from "@mui/material";
import StepperButtons from "../../(stepper)/Buttons";
import StepperContent from "../../(stepper)/(content)/Content";
import CodewarsValidationStepper from "../../(stepper)/stepper";

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

      <StepperContent
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
