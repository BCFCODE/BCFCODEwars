"use client";

import { Box, Button } from "@mui/material";
import { useRouter } from "next/navigation";
import { ReactNode } from "react";

import StepperButtons from "../../(stepper)/buttons";
import CodewarsValidationStepper from "../../(stepper)/stepper";
import { steps } from "../../(stepper)/constants";

interface Props {
  children: ReactNode;
  params: { stepNumber: string };
}

const Layout = ({ children, params: { stepNumber } }: Props) => {
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
      <CodewarsValidationStepper activeStep={Number(stepNumber)} />
      {children}
    </Box>
  );
};

export default Layout;
