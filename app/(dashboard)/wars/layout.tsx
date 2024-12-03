"use client";

import { Box, Button } from "@mui/material";
import { ReactNode, useState } from "react";
import CodewarsUsernameCheckerStepper from "./codewars/users/validation/Stepper/stepper";
import { steps } from "./codewars/users/validation/Stepper/constants";

interface Props {
  children: ReactNode;
  codewars: ReactNode;
}

const Layout = ({ children , codewars}: Props) => {
  const [activeStep, setActiveStep] = useState(0);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100%", // Full height of the screen
        bgcolor: "background.default", // Neutral background color
        color: "text.primary", // Primary text color for readability
        p: { xs: 3, sm: 5 }, // Responsive padding (smaller on mobile)
        boxShadow: 3, // Subtle shadow for depth
        borderRadius: 2, // Rounded corners for a modern feel
      }}
    >
      <CodewarsUsernameCheckerStepper activeStep={activeStep} />
      {children}
      <Box sx={{ display: "flex", width: "100%", flexDirection: "row", pt: 2 }}>
        <Button
          color="inherit"
          disabled={activeStep === 0}
          onClick={handleBack}
          sx={{ mr: 1 }}
        >
          Back
        </Button>
        <Box sx={{ flex: "1 1 auto" }} />
        <Button onClick={handleNext}>
          {activeStep === steps.length - 1 ? "Finish" : "Next"}
        </Button>
      </Box>
    </Box>
  );
};

export default Layout;
