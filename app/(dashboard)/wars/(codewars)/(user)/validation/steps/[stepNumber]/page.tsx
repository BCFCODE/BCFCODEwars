
import CodewarsValidationStepper from "../stepper";
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
    </>
  );
};

export default StepNumberPage;
