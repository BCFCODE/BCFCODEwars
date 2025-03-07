import CodewarsValidationStepper from "../topStepper";
import Steps from "../stepSwitch";
import { Box } from "@mui/material";

interface Props {
  params: Promise<{ stepNumber: number }>;
  searchParams: Promise<{ username: string }>;
}

const StepNumberPage = async ({ params, searchParams }: Props) => {
  const { username } = await searchParams;

  const { stepNumber } = await params;

  return (
    <Box
      sx={{
        // backgroundColor: 'red',
        display: "flex",
        width: "100%",
        height: '100%',
        flexDirection: "column",
        alignItems: "center",
        justifyContent: 'space-evenly',
        textAlign: "center",
        gap: 3,
        px: 3,
        // pt: 5,
      }}
    >
      <CodewarsValidationStepper activeStep={Number(stepNumber)} />

      <Steps validatedUsername={username} currentStep={Number(stepNumber)} />
    </Box>
  );
};

export default StepNumberPage;
