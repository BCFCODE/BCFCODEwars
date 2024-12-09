import { Box, Button } from "@mui/material";
import { steps } from "./constants";
import { useRouter } from "next/navigation";

interface Props {
  currentStep: number;
}

const StepperButtons = ({ currentStep = 0 }: Props) => {
  const router = useRouter();


  return (
    <>
      <Button
        color="inherit"
        disabled={currentStep === 0}
        onClick={() => router.push(`${currentStep - 1}`)}
        sx={{ mr: 1 }}
      >
        Back
      </Button>
      <Box sx={{ flex: "1 1 auto" }} />
      <Button onClick={() => router.push(`${currentStep + 1}`)}>
        {currentStep === steps.length - 1 ? "Finish" : "Next"}
      </Button>
    </>
  );
};

export default StepperButtons;
