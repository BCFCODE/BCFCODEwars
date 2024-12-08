"use client";

import { Box, Button } from "@mui/material";
import { ReactNode, useState } from "react";
import { useRouter } from "next/navigation";
import { steps } from "../../(stepper)/constants";
import CodewarsUsernameCheckerStepper from "../../(stepper)/stepper";

interface Props {
  children: ReactNode;
  params: { stepNumber: string };
}

const Layout = ({ children, params: { stepNumber } }: Props) => {
  const router = useRouter();
  const currentStep = Number(stepNumber);

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
      <CodewarsUsernameCheckerStepper activeStep={currentStep} />
      {children}
      <Box sx={{ display: "flex", width: "100%", flexDirection: "row", pt: 2 }}>
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
      </Box>
    </Box>
  );
};

export default Layout;
