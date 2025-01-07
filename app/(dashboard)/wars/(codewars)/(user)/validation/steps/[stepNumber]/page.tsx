import CodewarsValidationStepper from "../topStepper";
import Steps from "../stepSwitch";

interface Props {
  params: Promise<{ stepNumber: number }>;
  searchParams: Promise<{ username: string }>;
}

const StepNumberPage = async ({ params, searchParams }: Props) => {
  const { username } = await searchParams;

  const { stepNumber } = await params;

  return (
    <>
      <CodewarsValidationStepper activeStep={Number(stepNumber)} />

      <Steps validatedUsername={username} currentStep={Number(stepNumber)} />
    </>
  );
};

export default StepNumberPage;
