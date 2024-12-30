import CodewarsValidationStepper from "../topStepper";
import Steps from "../stepSwitch";

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

      <Steps validatedUsername={username} currentStep={Number(stepNumber)} />
    </>
  );
};

export default StepNumberPage;
